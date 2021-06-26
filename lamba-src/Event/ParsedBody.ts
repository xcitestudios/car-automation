import TeslaAction from "../Tesla/ParsedBody/TeslaAction";
import TeslaAuthenticate from "../Tesla/ParsedBody/TeslaAuthenticate";
import jwt_decode from "jwt-decode";
import { Actions } from "./ParsedBody/Actions";

export interface Jwt {
    id: string,
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
        this.jwt = jwt_decode(json.data.jwt.token);
        this.jwt.rawJwt = json.data.jwt.token;
    }

    public getData<T extends TeslaAuthenticate | TeslaAction>(): T {
        return this.data as T;
    }
}
