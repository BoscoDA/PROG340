using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DungeonCrawler
{
    internal class Question
    {
        public string Riddle { get; set; }
        public string CorrectAnswer { get; set; }
        public string WrongAnswer1 { get; set; }
        public string WrongAnswer2 { get; set; }

        public Question(string riddle, string correctAnswer, string wrongAnswer1, string wrongAnswer2)
        {
            Riddle = riddle;
            CorrectAnswer = correctAnswer;
            WrongAnswer1 = wrongAnswer1;
            WrongAnswer2 = wrongAnswer2;
        }

        public bool CheckAnswer()
        {
            return false;
        }
    }
}
