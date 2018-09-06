'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(config.keys.startsWith(pkg.name));

    // const ctx = mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /', () => {
    return httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });
});
