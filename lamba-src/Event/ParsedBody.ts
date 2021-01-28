import TeslaAction from "../Tesla/ParsedBody/TeslaAction";
import TeslaAuthenticate from "../Tesla/ParsedBody/TeslaAuthenticate";
import { Actions } from "./ParsedBody/Actions";


export default class ParsedBody {
    public readonly action: Actions;
    public readonly jwt: any;

    protected readonly data: TeslaAction | TeslaAuthenticate;

    constructor(jsonBody: string) {
        const json = JSON.parse(jsonBody);
        this.action = json.action;
        this.data = json.data;
    }

    public getData<T extends TeslaAuthenticate | TeslaAction>(): T {
        return this.data as T;
    }
}
