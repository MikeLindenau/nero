
require('shelljs/global');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');


function resolveRemote(opts) {
  const sourceControlHost = {
    github: 'github.com',
    bitbucket: 'bitbucket.org'
  }

  const host = sourceControlHost[opts.sourceControlHost] || sourceControlHost['bitbucket'];
  const namespace = opts.sourceNamespace || opts.organization;
  const sshRemote = `git@${host}:${namespace}/${opts.repo}.git`;
  const httpsRemote = `https://${host}/${namespace}/${opts.repo}.git`;

  return opts.useSSH ? sshRemote : httpsRemote;
}


function resolveServices(config, opts) {
  const {organization, sourceControlHost, services} = config;
  const cwd = process.cwd();
  const useSSH = opts.ssh;

  services.forEach((service) => {
    const {name, remote} = service;
    const swd = path.resolve(`./${name}`);

    console.log(`\n------------Initializing ${name} service------------`);

    if (fs.existsSync(swd)) {
      exec('git pull', { cwd: swd });
      return;
    }

    if (remote) {
      exec(`git clone ${remote}`, { cwd });
      return;
    }

    const remoteHost = resolveRemote({
      organization,
      sourceControlHost,
      useSSH,
      repo: name
    });

    console.log(`\n------------Cloning ${name} service------------`);
    exec(`git clone ${remoteHost}`, { cwd });
    console.log(`\n------------${name} service cloned------------`);

    console.log(`\n------------Installing ${name} service------------`);
    exec('npm install', { cwd: swd });
  });
}


function init(system_root, options) {
  const useSSH = options.ssh;
  const cwd = process.cwd();
  const rwd = path.resolve(cwd, `./${system_root}`);
  const sysConfigPath = path.resolve(rwd, `./nero.json`);
  const sysFileName = '.nero';
  const sysConf = {
    root: system_root,
    sshEnabled: useSSH,
    rwd,
    sysConfigPath
  }

  if (fs.existsSync(sysFileName)) {
    console.log(chalk.red('This is already an initialized system'));
    process.exit();
  }

  if (!fs.existsSync(sysConfigPath)) {
    console.log(chalk.red('Please add a nero.json config file to your system service'));
    process.exit();
  }

  fs.writeFile(sysFileName, JSON.stringify(sysConf), (err) => {
    if (err) throw err;
  });

  exec('git pull', { cwd: rwd });

  const sysConfig = require(sysConfigPath);

  resolveServices(sysConfig, {
    ssh: useSSH
  });
}


function pull(services, options) {
  const cwd = process.cwd();
  const settings = JSON.parse(fs.readFileSync(`${cwd}/.nero`, {encoding: 'utf8'}));
  const sysConfig = require(settings.sysConfigPath);

  exec('git pull', { cwd: settings.rwd });

  resolveServices(sysConfig, {
    ssh: settings.sshEnabled
  });
}


module.exports = {
  init,
  pull
}
