/// <reference path="../ts_definitions/xsockets.ts" />


module Xsockets.Geo {
    export class Connection {
        private controller: xsockets.Controller;
        private connection: xsockets.client;
        private isOpen = false;

        constructor(private map : Xsockets.Geo.Map) {
            this.openConnection();
            this.attachEvents();
        }

        private openConnection(): void {
            this.connection = new xsockets.client("ws://localhost:4502", ["GeoBase"]);
            this.controller = this.connection.controller("geobase");
            this.controller.onOpen = () => {
                this.isOpen = true;
            };
            this.connection.open();
        }

        private attachEvents(): void {
            this.controller.on("fencenotice", (data) => {
                console.log(data);
            });

            this.controller.on("withinfence", (data) => {
                this.map.colorPin(data.Id, data.IsInside);
            });
        }

        public testPoint(id: string, point: string): void{
            this.controller.invoke("withinfence", { id: id, geoJson: point });
        }
        
        public setFence(fence: string): void {
            if (this.isOpen) {
                this.controller.invoke("setfence", fence);
            } else {
                setTimeout(() => {
                    this.setFence(fence);
                }, 50);
            }
        }
    }
}