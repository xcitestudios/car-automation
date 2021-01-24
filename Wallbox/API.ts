'use strict';

import axios, { AxiosResponse, Method } from 'axios';

export interface Charger {
    id: string,
    locked: number,
    name: string,
    status: number
}

export default class Api {
    protected readonly baseUrl: string = "https://api.wall-box.com/";
    protected jwt: string | null = null;
    protected expires: number | null = null;

    constructor(protected readonly username: string, protected readonly password: string) {
    }

    protected async request(method: Method, path: string, body: string | undefined = undefined): Promise<AxiosResponse> {
        const performRequest = async (): Promise<AxiosResponse> => {
            return await axios.request({
                url: this.baseUrl + path,
                method: method,
                data: body,
                headers: {
                    'Authorization': 'Bearer ' + this.jwt,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        };

        if (this.jwt !== null) {
            return performRequest();
        }

        const response = await axios.get(
            this.baseUrl + 'auth/token/user',
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        this.jwt = response.data.jwt;
        this.expires = Date.now() + response.data.ttl;

        return await performRequest();
    }

    public async getChargerList(): Promise<Charger[]> {
        const response = await this.request('GET', 'v3/chargers/groups');

        return response.data.result.groups[0].chargers;
    }

    public async lockCharger(id: string): Promise<void> {
        await this.request('PUT', 'v2/charger/' + id, '{"locked": 1}');
    }

    public async unlockCharger(id: string): Promise<void> {
        await this.request('PUT', 'v2/charger/' + id, '{"locked": 0}');
    }
}