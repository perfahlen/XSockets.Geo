declare module xsockets {
    export class client {
        constructor(endpointadress: string, controllers: Array<string>);

        controller(controllerName: string): Controller;

        open(): void;
    }

    export class Controller {
        constructor();

        open(): void;

        onOpen(handler: () => void): void;

        invoke(methodName?: string): void;

        invoke(methodName?: string, ...arg: any[]): void;

        on(subject: string, handler: (data?: any) => void): void;
    }
}