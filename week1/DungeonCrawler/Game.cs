using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DungeonCrawler.Utilities;

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
            DisplayHud();
            Printer.Print($"You venture deep into the cave until you come to a intersection where the cave splits into threee paths. {Environment.NewLine}In the middle of the intersection on a stone pedestal is a stone tablet with a riddle enscripted on it. {Environment.NewLine}", ConsoleColor.Green);
            int riddleIndex = questionPicker.Next(riddles.Count);

            while (player.GetHealth() > 0 && player.GetCurrentStage() < stages)
            {
                Printer.Print($"{Environment.NewLine}The correct path forward answers this riddle:", ConsoleColor.Yellow);

                //Ask riddle
                Printer.Print($"{Environment.NewLine}{riddles[riddleIndex].GetRiddle()}", ConsoleColor.Yellow);

                //Get user answer
                Printer.Print($"{Environment.NewLine}{Environment.NewLine}At the mouth of each path there seems to be a symbol etched into the floor...{Environment.NewLine}", ConsoleColor.Green);
                foreach(string choice in riddles[riddleIndex].GetAnswers())
                {
                    Printer.Print($"{Environment.NewLine}{choice}", ConsoleColor.Yellow);
                }

                Printer.Print($"{Environment.NewLine}{Environment.NewLine}Enter the symbol of the path you would like to follow: ", ConsoleColor.Blue);
                string playerInput = Console.ReadLine().Trim();

                //Check answer
                bool success = riddles[riddleIndex].CheckAnswer(playerInput);

                //Update stage and/or health of player
                if(success)
                {
                    player.IncrementStage();
                    riddles.Remove(riddles[riddleIndex]);
                    DisplayHud();
                    Printer.Print($"You venture deeper into the cave until you come to another intersection. You approuch the stone pedestal and start to read it.{Environment.NewLine}", ConsoleColor.Green);
                    riddleIndex = questionPicker.Next(riddles.Count);
                }
                else
                {
                    player.LostLife();
                    DisplayHud();
                    Printer.Print($"You walk for awhile and seem to come to another intersection, you approuch the stone pedestal and start to read it, but something seems familar about it...{Environment.NewLine}", ConsoleColor.Green);
                }
            }
        }

        private void Setup()
        {
            //Display menu title
            Printer.Print($"{asciiArt}", ConsoleColor.Green);

            bool validName = false;

            while(validName == false)
            {
                //Ask for name
                Printer.Print($"{Environment.NewLine}{Environment.NewLine}Enter your name: ", ConsoleColor.Blue);

                //Player enter name
                string playerInput = Console.ReadLine().Trim();
                
                if(String.IsNullOrEmpty(playerInput)) 
                {
                   Printer.Print($"{Environment.NewLine}Invalid Name!",ConsoleColor.Red);
                }
                else
                {
                    player = new Player(playerInput, 4);
                    validName = true;
                }
            }
            

            //Welcome the player
            Printer.Print($"{Environment.NewLine}{Environment.NewLine}{player.GetName()}, press any key to venture into the cave...{ Environment.NewLine}", ConsoleColor.Blue);
            Console.ReadKey();
        }

        private void EndGame()
        {
            Console.Clear();

            if ((player.GetHealth() > 0) && (player.GetCurrentStage() == 3))
            {
                Printer.Print($"Congradulations! You made it through the cave.", ConsoleColor.Green);
            }
            else
            {
                Printer.Print($"Game Over! The darkness of the cave consumes you.", ConsoleColor.Red);
            }

            Printer.Print($"{Environment.NewLine}{Environment.NewLine}Press any key to exit the game...", ConsoleColor.Blue);
            Console.ReadKey();
        }

        private void DisplayHud()
        {
            Console.Clear();

            Printer.Print("Lives: ", ConsoleColor.Magenta);
            for (int i = 1; i <= player.GetHealth(); i++)
            {
                Printer.Print("\u2665", ConsoleColor.Red);
            }
            Printer.Print($"{Environment.NewLine}Score: {player.GetCurrentStage()}{Environment.NewLine}{Environment.NewLine}",ConsoleColor.Magenta);
        }
    }
}
