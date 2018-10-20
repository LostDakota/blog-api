var supertest = require('supertest');

describe('loading express', function () {
  var server;
  this.enableTimeouts(false);
  beforeEach(function () {
    server = require('./index');
  });
  afterEach(function (done) {
    if(server.address()){
      server.close(done);
    }    
  });
  it('responds to /posts', function testSlash(done) {
    supertest(server)
      .get('/posts')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    console.log('test 404')
    supertest(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});