import yargs from 'yargs'
import {log} from './utils/log'
import {buildContext, getCommand, assertContext} from './utils/middlewares'
import {version} from '../package.json'

yargs.usage('\nUsage: contentful <cmd> [args]')
  .commandDir('cmds')
  .middleware([
    getCommand,
    buildContext,
    assertContext
  ])
  .scriptName('')
  .demandCommand(4, 'Please specify a command.')
  .help('h')
  .alias('h', 'help')
  .strict()
  .recommendCommands()
  .option('v', {
    alias: 'version',
    global: false,
    type: 'boolean',
    describe: 'Show current version',
    skipValidation: true
  })
  .version(false)
  .epilog('Copyright 2018 Contentful, this is a BETA release')
  .fail(function (msg, err, yargs) {
    if (err) throw err
    console.error(yargs.help())
    console.error(msg)
    process.exit(1)
  })
  .parse(process.argv.slice(2), (_, argv, output) => {
    if (argv.version === true && !argv._.length) {
      log(version)
    } else {
      log(output)
    }
  })
