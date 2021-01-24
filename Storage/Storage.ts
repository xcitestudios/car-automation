export default interface Storage {
    store(key: string, value: any): Promise<void>;
    retrieve(key: string): Promise<any>;
}