import { combineReducers } from 'redux'
import { createReceiveReducer, createReceiveGameMessageReducer, createGameActionWithPayload, createGameAction } from '../../store/actionHelpers';
import { Question } from './Question';
import { guid } from '../../util/guid';
import StorageManager from '../../store/StorageManager';
import { AvailableAnswers } from './AvailableAnswers';
import { Answer } from './Answer';
import { SelectedAnswer } from './SelectedAnswer';
import { RootState } from '../../store/RootState';
import { createSelector } from '@reduxjs/toolkit';

export const Name = "poll";

export interface PollState {
    player: PollPlayerState,
    presenter: PollPresenterState,
}

interface PollPlayerState extends AvailableAnswers {
    selectedAnswerId?: string,
    answerLocked: boolean,
}

interface PollPresenterState {
    questions: Question[],
    currentQuestionId: string | undefined,
    showResponses: boolean,
}

const storage = new StorageManager(window.localStorage);
const storageKey = "poll:questions";

export const exportQuestionsAction = createGameAction(Name, "presenter", "export-questions");
export const toggleResponsesAction = createGameAction(Name, "presenter", "toggle-responses");
export const addQuestionAction = createGameActionWithPayload<string>(Name, "presenter", "add-question");
export const updateQuestionAction = createGameActionWithPayload<Question>(Name, "presenter", "update-question");
export const deleteQuestionAction = createGameActionWithPayload<Question>(Name, "presenter", "delete-question");
export const importQuestionsAction = createGameActionWithPayload<Question[]>(Name, "presenter", "import-questions");
export const setCurrentQuestionAction = createGameActionWithPayload<string>(Name, "presenter", "set-current-question");
export const selectAnswerAction = createGameActionWithPayload<string>(Name, "client", "select-answer");
export const lockAnswerAction = createGameAction(Name, "client", "lock-answer");

export const currentQuestionSelector = createSelector(
    (state: RootState) => ({
        currentQuestionId: state.games.poll.presenter.currentQuestionId,
        questions: state.games.poll.presenter.questions,
    }),
    (state) => ({
        currentQuestionId: state.currentQuestionId,
        question: state.questions.find(q => q.id === (state.currentQuestionId || ""))
    })
);

const presenterReducer = createReceiveGameMessageReducer<SelectedAnswer, PollPresenterState>(
    Name, 
    {
        questions: storage.getFromStorage(storageKey) || [],
        currentQuestionId: undefined,
        showResponses: true,
    },
    (state, { payload: { id: playerId, name: playerName, payload: { questionId, selectedId: answerId, }, }}) => {
        const question = state.questions.find(q => q.id === questionId && state.currentQuestionId === questionId);
        if (!question) {
            return state;
        }
        const questions: Question[] = state.questions.map(q => {
            if (q.id === question.id) {
                return {
                    ...q,
                    responses: [
                        ...q.responses.filter(r => r.playerId !== playerId),
                        { playerName, playerId, answerId},
                    ]
                }
            } else {
                return q;
            }
        });
        return {
            ...state,
            questions,
        };
    },
    "presenter",
    (builder) => {
        builder.addCase(addQuestionAction, (state, action) => {
            const questions = [...state.questions, { 
                id: action.payload,
                isVisible: true,
                order: state.questions.length,
                responses: [],
                text: 'Change this text to your question',
                answers: [{
                    id: guid(),
                    text: 'An answer'
                }],
            }];
            storage.saveToStorage(storageKey, questions);
            return {
                ...state,
                questions,
            };
        });
        builder.addCase(updateQuestionAction, (state, { payload: question}) => {
            const questions = state.questions.map(q => q.id !== question.id ? q : question);
            storage.saveToStorage(storageKey, questions);
            return {
                ...state,
                questions,
            };
        });
        builder.addCase(deleteQuestionAction, (state, { payload: question}) => {
            const questions = state.questions.filter(q => q.id !== question.id);
            storage.saveToStorage(storageKey, questions);
            return {
                ...state,
                questions,
            };
        });
        builder.addCase(importQuestionsAction, (state, { payload: questions}) => {
            storage.saveToStorage(storageKey, questions);
            return {
                ...state,
                questions,
            };
        });
        builder.addCase(setCurrentQuestionAction, (state, { payload: currentQuestionId }) => ({
            ...state,
            currentQuestionId,
        }));
        builder.addCase(toggleResponsesAction, (state) => ({
            ...state,
            showResponses: !state.showResponses
        }));
    }
);

const playerReducer = createReceiveReducer<PollPlayerState, AvailableAnswers>(
    Name,
    {
        answers: [],
        questionId: '',
        answerLocked: false,
    }, 
    (state, { payload: availableAnswers }) => ({
        ...state,
        ...availableAnswers,
        answerLocked: false,
        selectedAnswerId: undefined,
    }), 
    "client",
    (builder) => {
        builder.addCase(selectAnswerAction, (state, { payload: selectedAnswerId } ) => ({
            ...state,
            selectedAnswerId,
        }));
        builder.addCase(lockAnswerAction, (state) => ({
            ...state,
            answerLocked: true,
        }));
    }
);

export const pollReducer = combineReducers<PollState>({
    player: playerReducer,
    presenter: presenterReducer,
});

