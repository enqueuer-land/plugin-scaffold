import {Publisher, InputPublisherModel as PublisherModel} from 'enqueuer';

export class MyPublisher extends Publisher {

    public constructor(publisherProperties: PublisherModel) {
        super(publisherProperties);
    }

    public async publish(): Promise<any> {
        //Publish it to somewhere
        this.executeHookEvent('onFirstHook', {revertedFirst: this.first.split('').reverse().join('')});
        this.executeHookEvent('onSecondHook', {second: this.second.split('').join('.')});

        //This value below is printed in 'onFinish::publisher' test as 'prove' it actually sent something.
        // If no value is returned but the promise does not fail, a default value is printed.
        return {value: 'it has published'};

    }

}
