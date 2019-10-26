const app = require('../../src/app');

describe('\'contact\' service', () => {
  it('registered the service', () => {
    const service = app.service('contact');
    expect(service).toBeTruthy();
  });
});
