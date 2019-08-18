import React, { Component } from 'react';
import { DoggosVsKittehsClient } from './DoggosVsKittehs/DoggosVsKittehsClient';
import { DoggosVsKittehsPresenter } from './DoggosVsKittehs/DoggosVsKittehsPresenter';
import { BroadcastClient } from './Broadcast/BroadcastClient';
import { BroadcastPresenter } from './Broadcast/BroadcastPresenter';
import { YesNoMaybePresenter } from './YesNoMaybe/YesNoMaybePresenter';
import { YesNoMaybeClient } from './YesNoMaybe/YesNoMaybeClient';
import { IdeaWallClient } from './IdeaWall/IdeaWallClient';
import { IdeaWallPresenter, StartStopContinueLanes } from './IdeaWall/IdeaWallPresenter';
import { BuzzerClient } from './Buzzer/BuzzerClient';
import { BuzzerPresenter } from './Buzzer/BuzzerPresenter';
import PongPresenter from './Pong/PongPresenter';
import { PongClient } from './Pong/PongClient';
import { StartStopContinueClient } from './StartStopContinue/StartStopContinueClient';
import { SlideshowClient } from './Slideshow/SlideshowClient';
import { SlideshowPresenter } from './Slideshow/SlideshowPresenter';

export interface IGame {
    name: string;
    client: any;
    presenter: any;
    title: string;
    isGame?: boolean;
    disabled?: boolean;
    fullscreen?: boolean;
}

export default function (props: any) : IGame[] {
    return [{
        name: "doggos-vs-kittehs",
        client: <DoggosVsKittehsClient {...props} />,
        presenter: <DoggosVsKittehsPresenter {...props} />,
        title: "Doggos vs Kittehs",
        isGame: true
    }, {
        name: "yes-no-maybe",
        client: <YesNoMaybeClient {...props} />,
        presenter: <YesNoMaybePresenter {...props} />,
        title: "Yes, No, Maybe"
    }, {
        name: "buzzer",
        client: <BuzzerClient {...props} />,
        presenter: <BuzzerPresenter {...props} />,
        title: "Buzzer",
        fullscreen: true
    }, {
        name: "pong",
        client: <PongClient {...props} />,
        presenter: <PongPresenter {...props} />,
        title: "Pong",
        fullscreen: true,
        isGame: true
    }, {
        name: "ideawall",
        client: <IdeaWallClient {...props} />,
        presenter: <IdeaWallPresenter dynamicSize={false} {...props} storageKey="ideawall:ideas" />,
        title: "Idea Wall",
        fullscreen: true,
        isGame: false
    }, {
        name: "startstopcontinue",
        client: <StartStopContinueClient {...props} />,
        presenter: <IdeaWallPresenter dynamicSize={true} {...props} storageKey="startstopcontinue:ideas" lanes={StartStopContinueLanes} />,
        title: "Start Stop Continue",
        fullscreen: true,
        isGame: false,
        disabled: true
    }, {
        name: "broadcast",
        client: <BroadcastClient {...props} />,
        presenter: <BroadcastPresenter {...props} />,
        title: "Broadcast",
        fullscreen: true,
        isGame: false
    }, {
        name: "slideshow",
        client: <SlideshowClient {...props} />,
        presenter: <SlideshowPresenter {...props} storageKey="slideshow:state" />,
        title: "Slideshow",
        fullscreen: true,
        isGame: false
    }];
}
