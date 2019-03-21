import {Asserter, Assertion, TestModel} from 'enqueuer-plugins-template';

export class MyAsserter implements Asserter {
    assert(assertion: Assertion, literal: any): TestModel {
        return {
            name: assertion.name,
            valid: assertion.assertThat == assertion.is,
            description: `Assert that ${literal.assertThat} is ${assertion.is}, got ${assertion.assertThat}`
        };
    }

}
