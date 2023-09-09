using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DungeonCrawler
{
    public class Game
    {
        string asciiArt;
        Player player;
        int stages;
        List<Question> riddles;

        public Game() 
        {
            stages = 3;
            asciiArt = @"    ███        ▄█    █▄       ▄████████       ▄████████    ▄████████  ▄█    █▄     ▄████████ 
▀█████████▄   ███    ███     ███    ███      ███    ███   ███    ███ ███    ███   ███    ███ 
   ▀███▀▀██   ███    ███     ███    █▀       ███    █▀    ███    ███ ███    ███   ███    █▀  
    ███   ▀  ▄███▄▄▄▄███▄▄  ▄███▄▄▄          ███          ███    ███ ███    ███  ▄███▄▄▄     
    ███     ▀▀███▀▀▀▀███▀  ▀▀███▀▀▀          ███        ▀███████████ ███    ███ ▀▀███▀▀▀     
    ███       ███    ███     ███    █▄       ███    █▄    ███    ███ ███    ███   ███    █▄  
    ███       ███    ███     ███    ███      ███    ███   ███    ███ ███    ███   ███    ███ 
   ▄████▀     ███    █▀      ██████████      ████████▀    ███    █▀   ▀██████▀    ██████████ 
                                                                                             


";

            riddles = new List<Question>
            {
                new Question("What has roots as nobody sees,\r\nIs taller than trees,\r\nUp, up it goes,\r\nAnd yet never grows?", "Mountain", "Tree", "Time"),
                new Question("Voiceless it cries,\r\nWingless flutters,\r\nToothless bites,\r\nMouthless mutters", "Wind", "Sound", "Air"),
                new Question("Alive without breath,\r\nAs cold as death;\r\nNever thirsty, ever drinking,\r\nAll in mail never clinking.", "Fish", "Frog", "Snail")
            };
        }

        public void Start()
        {
            Setup();
            GameLoop();
            EndGame();
        }

        private void GameLoop()
        {
            Random questionPicker = new Random();

            Console.WriteLine($"You venture deep into the cave until you come to a intersection where the cave splits into threee paths. " +
                $"{Environment.NewLine}In the middle of the intersection on a stone pedestal is a stone tablet with a riddle enscripted on it.");
            int riddleIndex = questionPicker.Next(riddles.Count);

            while (player.GetHealth() > 0 && player.GetCurrentStage() < stages)
            {
                Console.WriteLine($"{Environment.NewLine}The correct path forward answers this riddle:");

                //Ask riddle
                Console.WriteLine($"{Environment.NewLine}{riddles[riddleIndex].GetRiddle()}");

                //Get user answer
                Console.WriteLine($"{Environment.NewLine}At the mouth of each path there seems to be a symbol etched into the floor...");
                foreach(string choice in riddles[riddleIndex].GetAnswers())
                {
                    Console.WriteLine(choice);
                }

                Console.Write($"{Environment.NewLine}Enter the symbol of the path you would like to follow: ");
                string playerInput = Console.ReadLine().Trim();

                //Check answer
                bool success = riddles[riddleIndex].CheckAnswer(playerInput);

                //Update stage and/or health of player
                if(success)
                {
                    player.IncrementStage();
                    riddles.Remove(riddles[riddleIndex]);
                    Console.Clear();
                    Console.WriteLine($"You venture deeper into the cave until you come to another intersection. You approuch the stone pedestal and start to read it.");
                    riddleIndex = questionPicker.Next(riddles.Count);
                }
                else
                {
                    player.LostLife();
                    Console.Clear();
                    Console.WriteLine($"You walk for awhile and seem to come to another intersection, you approuch the stone pedestal and start to read it, but something seems familar about it...");
                }
            }
        }

        private void Setup()
        {
            //Display menu title
            Console.WriteLine($"{asciiArt} {Environment.NewLine}");

            //Ask for name
            Console.Write("Enter your name: ");

            //Player enter name
            string playerInput = Console.ReadLine().Trim();
            player = new Player(playerInput, 4);

            //Welcome the player
            Console.WriteLine($"{Environment.NewLine}{player.GetName()}, press any key to venture into the cave...{ Environment.NewLine}");
            Console.ReadKey();
            Console.Clear();
        }

        private void EndGame()
        {
            Console.Clear();

            if ((player.GetHealth() > 0) && (player.GetCurrentStage() == 3))
            {
                Console.WriteLine($"{Environment.NewLine}Congradulations! You made it through the cave.");
            }
            else
            {
                Console.WriteLine($"{Environment.NewLine}Game Over! The darkness of the cave consumes you.");
            }

            Console.WriteLine($"{Environment.NewLine}Press any key to exit the game...");
            Console.ReadKey();
        }
    }
}
