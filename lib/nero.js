#!/usr/bin/env node

/*
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

const program = require('commander');
const version = require('../package.json').version;
const Service = require('./service/service.js');
const System = require('./system');

program.version(version)


program.command('init <system>')
  .option('--ssh', 'Use ssh')
  .option('h', '--source-control-host <host>', 'Can specify source host provider ie. github')
  .option('o', '--org <org>', 'Provide organization name')
  .action(function(system, self){
    const opts = {
      ssh: self.ssh,
      sourceControlHost: self.host ? self.host.toLowerCase() : '',
      organization: self.org ? self.org.toLowerCase() : ''
    }

    System.init(system, opts);
  });


program.command('pull [service]')
  .action(function(remote, options){
    System.pull(remote, options);
  });


program.command('create_service <name>')
  .action(function(name, options){
    Service.build(name, options);
  });


program.parse(process.argv);
