import { setupNewUser } from '../src/utils/User';
import * as Email from '../src/utils/Email';

import sinon from 'sinon';
import assert from 'assert';

describe('User', () => {
  it('should pass object with correct values to send', function () {
    const sendStub = sinon.stub(Email, 'send');
    const info = { name: 'test' };

    const expectedUser = {
      name: info.name,
      nameLowerCase: info.name.toLowerCase()
    };

    setupNewUser(info, function () {});

    sinon.assert.calledWith(sendStub, expectedUser);

    sendStub.restore();
  });

  it('should return the value as determined', function () {
    const sendStub = sinon.stub(Email, 'send');
    sendStub.returns('NOT_TEST');

    const callback = sinon.spy();

    const val = setupNewUser({ name: 'test' }, callback);

    assert.notEqual(val, 'TEST');
    assert.equal(val, 'NOT_TEST');

    sendStub.restore();
  });

  it('should pass the error into the callback if save fails', function () {
    const expectedError = new Error('error');
    const sendStub = sinon.stub(Email, 'send');
    sendStub.throws(expectedError);

    const callback = sinon.spy();

    setupNewUser({ name: 'test' }, callback);

    sinon.assert.calledWith(callback, expectedError);

    sendStub.restore();
  });
});
