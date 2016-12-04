

var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();

env.registerStub(require('./seneca-service'), 'nero:service');

function build(name, options) {
  console.log('creating servicess "%s"', name);

  env.run('nero:service', {name:name}, function() {
    console.log('done');
  });
}

module.exports = {
  build: build
}
