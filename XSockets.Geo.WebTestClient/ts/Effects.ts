namespace Xsockets.Geo {
    export class Effects {
        static blink(elem: HTMLElement, callback: Function) : void {
            let blinkCounter = 0;
            let intervalId = setInterval(() => {
                blinkCounter += 1;
                blinkCounter % 2 === 1 ? elem.style.visibility = "collapse" : elem.style.visibility = "visible";
                if (blinkCounter === 8) {
                    clearInterval(intervalId);
                    callback();
                }
            }, 150);
        }
    }
}