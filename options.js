var colorSet = {
  red:'\x1b[31m',
  lightBlue:'\x1b[36m',
  green:'\x1b[32m',
  yellow:'\x1b[33m',
  blue:'\x1b[34m',
  purple:'\x1b[35m',
  defaults:'\x1b[36m'
}

module.exports = {
  console:{
    color:'\x1b[36m',
    enabled:false,
    colors:{
      keys:Object.keys(colorSet),
      colorSet:colorSet,
      set:function(color){
        return colorSet[color]
      }
    }
  },
  regex:{
    startWith:'@inject ',
    safe:true,
    built:null
  },

}
