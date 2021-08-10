import Indicator from './src/main.js'

Indicator.install = function(Vue) {
    Vue.prototype.$indicator = Indicator
}

export default Indicator