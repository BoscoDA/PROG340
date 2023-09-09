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
        Question[] riddles;

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

            riddles = new Question[]
            {
                new Question("", "", "", ""),
                new Question("", "", "", ""),
                new Question("", "", "", "")
            };
        }

        public void Start()
        {
            Setup();
            GameLoop();
        }

        private void GameLoop()
        {
            while(player.GetHealth() > 0 && player.GetCurrentStage() <= stages)
            {
                //Ask riddle

                //Get user answer

                //Check answer

                //Update stage and/or health of player
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
        }
    }
}
