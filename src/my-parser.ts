import {ObjectParser} from 'enqueuer-plugins-template';

export class MyParser implements ObjectParser {

    parse(value: string, query?: any): object {
        return JSON.parse(value);
    }

}
