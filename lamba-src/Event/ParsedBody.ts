import TeslaAction from "../Tesla/ParsedBody/TeslaAction";
import TeslaAuthenticate from "../Tesla/ParsedBody/TeslaAuthenticate";
import { Actions } from "./ParsedBody/Actions";
import { decode } from 'js-base64';

export interface Jwt {
    rawJwt: string,
    username: string
}

export default class ParsedBody {
    public readonly action: Actions;
    public readonly jwt: Jwt;

    protected readonly data: TeslaAction | TeslaAuthenticate;

    constructor(jsonBody: string) {
        const json = JSON.parse(jsonBody);
        this.action = json.action;
        this.data = json.data;
        this.jwt = JSON.parse(decode(json.jwt));
        this.jwt.rawJwt = json.jwt;
    }

    public getData<T extends TeslaAuthenticate | TeslaAction>(): T {
        return this.data as T;
    }
}
