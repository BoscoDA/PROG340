using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DungeonCrawler.Utilities
{
    public static class Printer
    {
        /// <summary>
        /// Method for printing all information to the console.
        /// </summary>
        /// <param name="output"></param>
        /// <param name="color"></param>
        public static void Print(string output, ConsoleColor foregroundColor = ConsoleColor.White, ConsoleColor backgroundColor = ConsoleColor.Black)
        {
            Console.ForegroundColor = foregroundColor;
            Console.BackgroundColor = backgroundColor;

            Console.Write(output);
        }

        public static void WaitForInput(string message)
        {
            ConsoleColor previousColor = Console.ForegroundColor;
            Console.ForegroundColor = ConsoleColor.Yellow;

            Console.Write(message);

            Console.ReadKey();

            Console.ForegroundColor = previousColor;
        }
    }
}
