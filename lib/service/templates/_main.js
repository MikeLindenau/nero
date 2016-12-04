

const <%= serviceMethodName %> = function (options) {
  const seneca = this;


  seneca.add('role:<%= role %>, cmd:sample', sample);


  function sample(args, done) {
    done(null, {
      ok: true
    });
  }


  return {
    name: '<%= name %>'
  };
};


module.exports = <%= serviceMethodName %>;
