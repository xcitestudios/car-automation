'use strict';

import axios, { AxiosResponse, Method } from 'axios';
import { Token } from './TokenResponse';
import { Vehicle } from './Vehicle';

export default class Api {
    protected readonly clientSecret: string = "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3";
    protected readonly clientId: string = "81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384";

    protected readonly baseUrl: string = "https://owner-api.teslamotors.com/";

    protected readonly objectTidyingConversions: object = {
        vehicle_id: 'vehicleId',
        display_name: 'displayName',
        option_codes: function (codes) {
            return { 'optionCodes': codes.split(',') };
        }
    };

    constructor(protected readonly token: Token | undefined = undefined) {
    }

    protected async request(method: Method, path: string, body: string | undefined = undefined): Promise<AxiosResponse> {
        if (this.token === undefined) {
            throw "No access token specified";
        }

        return await axios.request({
            url: this.baseUrl + path,
            method: method,
            data: body,
            headers: {
                'Authorization': 'Bearer ' + this.token.access_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    protected tidyOutput(input: any): any {
        for (var k in this.objectTidyingConversions) {
            if (!input.hasOwnProperty(k)) {
                continue;
            }

            if (typeof this.objectTidyingConversions[k] === 'function') {
                Object.assign(input, this.objectTidyingConversions[k](input[k]));
            } else {
                input[this.objectTidyingConversions[k]] = input[k];
            }
            delete input[k];
        }

        return input;
    }

    public async getToken(username: string, password: string): Promise<Token> {
        const response = await axios.post(
            this.baseUrl + 'oauth/token',
            {
                email: username,
                password: password,
                client_secret: this.clientSecret,
                client_id: this.clientId,
                grant_type: 'password'
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        response.data.expires_in += Date.now();

        return response.data;
    }

    public async getVehicleList(): Promise<Vehicle[]> {
        const response = await this.request('GET', 'api/1/vehicles');

        return response.data.response.map(this.tidyOutput.bind(this));
    }

    public async startHvac(id: number): Promise<void> {
        await this.request('POST', 'api/1/vehicles/' + id.toString() + '/command/auto_conditioning_start', '{}');

        return;
    }

    public async stopHvac(id: number): Promise<void> {
        await this.request('POST', 'api/1/vehicles/' + id.toString() + '/command/auto_conditioning_stop', '{}');

        return;
    }

    public async wakeUp(id: number): Promise<void> {
        await this.request('POST', 'api/1/vehicles/' + id.toString() + '/wake_up', '{}');

        return;
    }

    public async openChargePort(id: number): Promise<void> {
        await this.request('POST', 'api/1/vehicles/' + id.toString() + '/command/charge_port_door_open', '{}');

        return;
    }
}