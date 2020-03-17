import {InputSubscriptionModel as SubscriptionModel, Subscription} from 'enqueuer';

export class MySubscription extends Subscription {

    constructor(subscriptionModel: SubscriptionModel) {
        super(subscriptionModel);
    }

    public async receiveMessage(): Promise<any> {
        //Get the message and send it back as this method return
        this.executeHookEvent('onMessageReceived', {value: this.received, numeral: this.number});
        //This value below is printed in 'onFinish::message received' test as 'prove' it actually received anything.
        // If no value is returned but the promise does not fail, a default value is printed.
        return {value: this.received, numeral: this.number};
    }

    public async subscribe(): Promise<void> {
        //Override it to open a server, register a listener or something similar
        this.executeHookEvent('onSubscribed', {subscribed: 'yay'});
    }

    public async unsubscribe(): Promise<void> {
        //Override it if you need to close a server, remove a listener or something similar
        this.executeHookEvent('onUnsubscribed', {unsubscribed: 'noo'});
    }

    public async sendResponse(): Promise<void> {
        //Feel free execute any other hook
        this.executeHookEvent('onResponseSent', {response: 'not sync'});
    }

}
