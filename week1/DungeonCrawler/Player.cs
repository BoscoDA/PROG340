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

        public Player(string name, int health)
        {
            this.name = name;
            this.health = health;
        }

        public string GetName()
        {
            return name;
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
