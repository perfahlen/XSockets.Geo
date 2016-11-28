using System;
using XSockets.Core.Common.Socket;

namespace XSockets.GeoWorker
{
    public class Program
    {
        static void Main(string[] args)
        {

            using (var serverContainer = XSockets.Plugin.Framework.Composable.GetExport<IXSocketServerContainer>())
            {
                serverContainer.Start();
                Console.ReadLine();
            }
        }
    }
}
