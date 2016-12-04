
const _ = require('lodash');
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const userHome = require('user-home');
const camelCase = require('camelcase');
const upperCamelCase = require('uppercamelcase');

//fs.mkdirSync(dir);

module.exports = yeoman.Base.extend({
  prompting: function () {
    const name = this.options.name.replace('gs-','');
    const serviceFileName = `${name}.js`;
    const serviceMethodName = upperCamelCase(name);
    const serviceInstanceName = camelCase(name);

    this.props = {
      name,
      serviceFileName,
      serviceMethodName,
      serviceInstanceName
    };

    var prompts = [
        {
        type: 'input',
        name: 'name',
        message: 'Whats the service name?',
        default: name
      },
      {
        type: 'input',
        name: 'version',
        message: 'Whats the service version?',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What does your service do?',
        default: `A service doing what a service named ${name} would do.`
      },
      {
        type: 'input',
        name: 'author',
        message: 'Whats the authors name?',
        default: 'gumspace'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = _.extend(this.props, props);
    }.bind(this));
  },

  writing: {
    //Copy the configuration files
    setup: function () {

      // Override source root
      this.sourceRoot(__dirname+'/templates');

      // Create service root
      this.mkdir(this.props.name);
    },

    config: function () {
      const prefix = this.props.name;
      const paths = [
        prefix+'/package.json',
        prefix+'/README.md',
        prefix+'/.gitignore',
      ];

      this.fs.copyTpl(this.templatePath('_package.json'),this.destinationPath(paths[0]), {
        name: this.props.name,
        version: this.props.version
      });

      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath(paths[1]), {
        name: this.props.name.replace('-', ' '),
        version: this.props.version,
        author: this.props.author,
        description: this.props.description
      });

      this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath(paths[2]));
    },

    //Copy application files
    app: function() {
      const prefix = this.props.name;
      const paths = [
        `${prefix}/srv/start.js`,
        `${prefix}/lib/${this.props.serviceFileName}`,
        `${prefix}/test/index.test.js`
      ]

      // Scaffold structure
      this.mkdir(`${prefix}/srv`);
      this.mkdir(`${prefix}/lib`);
      this.mkdir(`${prefix}/test`);

      // Add default source files
      this.fs.copyTpl(this.templatePath('_start.js'), this.destinationPath(paths[0]), {
        name: this.props.name,
        serviceMethodName: this.props.serviceMethodName,
        serviceInstanceName: this.props.serviceInstanceName,
        serviceFileName: this.props.serviceFileName,
        role: this.props.name.replace('-', '_')
      });

      this.fs.copyTpl(this.templatePath('_main.js'), this.destinationPath(paths[1]), {
        name: this.props.name,
        serviceMethodName: this.props.serviceMethodName,
        role: this.props.name.replace('-', '_')
      });

      this.fs.copyTpl(this.templatePath('_test.js'), this.destinationPath(paths[2]));
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
