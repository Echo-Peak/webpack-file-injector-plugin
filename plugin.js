class plugin {
  constructor(self) {
    this.self = self;
  }
  apply(compiler) {
    let self = this.self;


    // compiler.plugin('done',function(){
    //
    // });
    compiler.plugin('emit', function(compilation, callback) {
      compilation.chunks.forEach(function(chunk) {
        chunk.modules.forEach(function(module) {

          let newModule = self.replace(module._source._value, module._source._name);

          module._source._value = newModule;
          self.emit('tranform', newModule, module._source._name, function(newStream) {
            if(newStream){
              module._source._value = newStream;
            }

          });

        });

        chunk.files.forEach(function(filename) {
          let source = compilation.assets[filename].source();
        });

      });

      callback();
    });
  }

}

module.exports = plugin
