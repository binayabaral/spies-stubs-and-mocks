import sinon from 'sinon';
import * as Email from '../src/utils/Email';
import { setupNewUser } from '../src/utils/User';

describe('User', () => {
  it('should pass object with correct values to send once', function () {
    const emailMock = sinon.mock(Email);
    const info = { name: 'test' };

    const expectedUser = {
      name: info.name,
      nameLowerCase: info.name.toLowerCase()
    };
    emailMock.expects('send').once().withArgs(expectedUser);
    setupNewUser(info, function () {});

    emailMock.verify();
    emailMock.restore();
  });
});
