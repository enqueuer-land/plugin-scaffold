import {MySubscription} from './my-subscription';
import {MyPublisher} from './my-publisher';
import {MainInstance, PublisherModel, PublisherProtocol, SubscriptionModel, SubscriptionProtocol} from 'enqueuer-plugins-template';
import {MyReportFormatter} from './my-formatter';
import {MyParser} from './my-parser';
import {MyAsserter} from './my-asserter';

//Enqueuer demands a 'entryPoint' method in the index file to the plugin work correctly
export function entryPoint(mainInstance: MainInstance): void {

    const mySubscription = new SubscriptionProtocol('my-plugin',
        (subscriptionModel: SubscriptionModel) => new MySubscription(subscriptionModel),
        ['received', 'number']) //Optional. Set it to help enqueuer users to identify the fields of the message received
        .addAlternativeName('alternativeName') //Optional. Set it to help enqueuer users. Set it if your plugin has alias
        .setLibrary('main-dependency-name'); //Optional. Set it to help enqueuer users

    mainInstance.protocolManager.addProtocol(mySubscription);

    const myPublisher = new PublisherProtocol('my-plugin',
        (publisherModel: PublisherModel) => new MyPublisher(publisherModel),
        ['data']) //Optional. Set it to help enqueuer users to identify the fields of the message received
        .addAlternativeName('alternativeName') //Optional. Set it to help enqueuer users. Set it if your plugin has alias
        .setLibrary('main-dependency-name');  //Optional. Set it to help enqueuer users
    mainInstance.protocolManager.addProtocol(myPublisher);

    mainInstance.reportFormatterManager.addReportFormatter(() => new MyReportFormatter(), 'my-plugin');
    mainInstance.objectParserManager.addObjectParser(() => new MyParser(), 'nqr');
    mainInstance.asserterManager.addAsserter({
        assertThat: {
            description: 'actual value'
        }, is: {
            description: 'expected value'
        }
    }, () => new MyAsserter());

}
