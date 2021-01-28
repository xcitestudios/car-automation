'use strict';

import { default as WallboxApi } from "./Wallbox/Api";
import { default as TeslaApi } from "./Tesla/Api";
import EventInterface from "./Event/EventInterface";
import ParsedBody from "./Event/ParsedBody";
import { Actions } from "./Event/ParsedBody/Actions";
import TeslaAuthenticate from "./Tesla/ParsedBody/TeslaAuthenticate";
import TeslaAction from "./Tesla/ParsedBody/TeslaAction";
import { Actions as TeslaActions } from "./Tesla/ParsedBody/Actions";
import DynamoDb from "./Storage/Amazon/DynamoDb";

export const handler = async (event: EventInterface): Promise<any> => {
    const parsedBody = new ParsedBody(event.body);
    const dynamoDb = new DynamoDb(process.env.DYNAMO_DB_TABLE as string);
    const userData = JSON.parse(await dynamoDb.retrieve(parsedBody.jwt.id));
    const teslaApi = new TeslaApi(userData.teslaToken);

    try {

        switch (parsedBody.action) {
            case Actions.TeslaAuthenticate:
                {
                    const data = parsedBody.getData<TeslaAuthenticate>();
                    userData.teslaToken = await teslaApi.getToken(data.username, data.password);
                    await dynamoDb.store(parsedBody.jwt.id, JSON.stringify(userData));
                }
                break;
            case Actions.TeslaAction:
                {
                    const data = parsedBody.getData<TeslaAction>();
                    const vehicleList = await teslaApi.getVehicleList();

                    switch (data.action) {
                        case TeslaActions.startHvac:
                            await teslaApi.startHvac(vehicleList[0].id);
                            break;
                        case TeslaActions.stopHvac:
                            await teslaApi.startHvac(vehicleList[0].id);
                            break;
                    }
                }
                break;
        }

        return {
            statusCode: 200,
            body: ''
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: err
        }
    }
};