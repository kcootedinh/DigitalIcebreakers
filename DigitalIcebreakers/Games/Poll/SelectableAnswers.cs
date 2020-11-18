public class SelectableAnswers
{
    public string QuestionId { get; set; }

    public Answer[] Answers { get; set; }

    public string SelectedAnswerId { get; set; }
}

public class CanAnswerPayload
{
    public bool CanAnswer { get; set; }
}