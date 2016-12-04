
const Seneca = require('seneca')
const Mesh = require('seneca-mesh')
const <%= serviceMethodName %> = require('../lib/<%= serviceFileName %>')


const envs = process.env

var opts = {
  seneca: {
    tag: envs.SERVICE_TAG || '<%= name %>'
  }
  <%= serviceInstanceName %>: {},
  isolated: {
    host: envs.SERVICE_HOST || 'localhost',
    port: envs.SERVICE_PORT || '8060'
  },
  mesh: {
    auto: true,
    host: envs.SERVICE_HOST || '127.0.0.1',
    bases: [envs.BASE_HOST || '127.0.0.1:39999'],
    listen: [
      {pin: 'role:<%= role %>,cmd:sample', model: 'consume', host: envs.SERVICE_HOST || '127.0.0.1'}
    ]
  }
}

const Service = Seneca(opts.seneca)

Service.use(<%= serviceMethodName %>, opts.<%= serviceInstanceName %>)

if (envs.NPM_ISOLATED) {
  Service.listen(opts.isolated)
}
else {
  Service.use(Mesh, opts.mesh)
}
