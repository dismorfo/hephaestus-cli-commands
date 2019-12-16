const { Command } = require('hephaestus');

module.exports = class ListMethods extends Command {

  get command () {
    return 'list-methods';
  }

  get description () {
    return 'List available methods';
  }

  action () {
    try {
      const chalk = require('chalk');
      const hephaestus = require('hephaestus');
      const esprima = require('esprima');
      Object.keys(hephaestus).forEach((command) => {
        const program = hephaestus.read.text(`${hephaestus.cwd()}/lib/${command}/index.js`);
        if (program) {
          console.log();
          console.log(`  ${chalk.green(command)}`);          
          const parsed = esprima.parseScript(program, { comment: true });
          if (parsed && parsed.comments.length) {
            if (parsed.comments[0].type === 'Block') {
              let value = parsed.comments[0].value;
              // First line: // '*\n'
              value = value.replace('*\n', '');
              const lines = value.split('\n');
              console.log(`  ${chalk.blue(lines[0].replace(' * ', ''))}`);
              for (let i = 1; i < lines.length; i++) {
                console.log(`  ${lines[i].replace(' * ', '')}`);
              }              
            }
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
};
