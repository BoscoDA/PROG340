using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DungeonCrawler
{
    public class Player
    {
        int health;
        string name;
        int currentStage;

        public Player(string name, int health)
        {
            this.name = name;
            this.health = health;
            currentStage = 0;
        }

        public string GetName()
        {
            return name;
        }

        public int GetCurrentStage()
        {
            return currentStage;
        }

        public void IncrementStage()
        {
            currentStage++;
        }

        public void LostLife()
        {
            health--;
        }

        public int GetHealth()
        {
            return health;
        }
    }
}
