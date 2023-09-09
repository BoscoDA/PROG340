using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DungeonCrawler
{
    internal class Question
    {
        string Riddle;
        string CorrectAnswer;
        List<string> Answers;

        public Question(string riddle, string correctAnswer, string wrongAnswer1, string wrongAnswer2)
        {
            Riddle = riddle;
            CorrectAnswer = correctAnswer;
            Answers = new List<string> 
            { 
                wrongAnswer1, 
                correctAnswer, 
                wrongAnswer2 
            };
        }

        public string GetRiddle()
        {
            return Riddle;
        }

        public List<string> GetAnswers()
        {
            return Answers;
        }

        public bool CheckAnswer(string playerInput)
        {
            bool isCorrect = playerInput.ToUpper() == CorrectAnswer.ToUpper();

            return isCorrect;
        }
    }
}
