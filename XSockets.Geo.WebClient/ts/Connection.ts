/// <reference path="../ts_definitions/xsockets.ts" />


namespace Xsockets.Geo {
    export class Connection {
        private controller: xsockets.Controller;
        private connection: xsockets.client;
        private isOpen = false;

        constructor(private map : Xsockets.Geo.Map) {
            this.openConnection();
            this.attachEvents();
        }

        private openConnection(): void {
            this.connection = new xsockets.client(this.map.XSocketsUrl, ["FenceController"]);
            this.controller = this.connection.controller("Fence");
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

        public setchannel(channel: string): void {
            this.set("setchannel", channel);
        }
        
        public setFence(fence: string): void {
            this.set("setfence", fence);
        }

        private set(invoke: string, value: string): void {
            if (this.isOpen) {
                this.controller.invoke(invoke, value);
            } else {
                setTimeout(() => {
                    this.set(invoke, value);
                }, 50);
            }
        }

    }
}