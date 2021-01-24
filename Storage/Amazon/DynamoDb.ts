import { DynamoDB } from "aws-sdk";
import Storage from "../Storage";


export default class DynamoDb implements Storage {
    db: DynamoDB.DocumentClient;

    constructor(protected readonly tableName: string) {
        this.db = new DynamoDB.DocumentClient();
    }

    async store(key: string, value: string): Promise<void> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
            }
        };
        params.Item["id"] = {
            "S": key
        };
        params.Item["value"] = {
            "S": value
        };

        try {
            await this.db
                .put(params)
                .promise()

            return;
        } catch (err) {
            throw new Error('Failed to store: ' + err);
        }
    }
    async retrieve(key: string): Promise<string> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                id: key
            }
        };

        try {
            const result = await this.db
                .get(params)
                .promise();
            return result!.Item!["value"];
        } catch (err) {
            throw new Error('Failed to retrieve: ' + err);
        }
    }
}