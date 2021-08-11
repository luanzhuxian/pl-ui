import Indicator from './src/main.js'

const install = function(Vue) {
    Vue.prototype.$indicator = Indicator
}

export default { Indicator, install }