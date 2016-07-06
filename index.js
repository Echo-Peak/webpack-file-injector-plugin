var path = require('path');
var fs = require('fs');
let EventEmitter = require('events');
let plugin = require('./plugin');
let replace = require('./replace');
let getFile = require('./get-file');

class InjectFile extends EventEmitter{
  constructor(){
    super();
    this.getFile = getFile.bind(this);
    this.replace = replace.bind(this);
    this.o = {
        keyword:new RegExp(`Include[\(](.+?)[\)]` ,'gm'),
        verboseLogging:true,
        beep:false,
    }
    this.getOptions = e => this.o;
    this.plugin = new plugin(this)

  }

  options(obj){
    let available;

    if(typeof obj === 'object' && obj !== null){
        available = {
          keyword:new RegExp(`${obj.keyword || 'Include'}[\(](.+?)[\)]` ,'gm'),
          verboseLogging:obj.keyword,
          beep:obj.beep,
        }
    }else{
      this.stdout('warn','using default options' ,'yellow');
    }


    this.o = available;
  }

  stdout(type ,msg ,color){
    let colors = {
      red:'\x1b[31m',
      lightBlue:'\x1b[36m',
      green:'\x1b[32m',
      yellow:'\x1b[33m',
      blue:'\x1b[34m',
      purple:'\x1b[35m',
      _default:'\x1b[0m'
    }

    type === 'error' && this.getOptions().beepWhenError && process.stdout.write('\x07');

    console.log(colors[color]+`${type.toUpperCase()}`+colors['_default'] , `${msg}`)
  }

}
module.exports =  new InjectFile()
