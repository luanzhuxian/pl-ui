import Loading from './src/main.js'

const install = function(Vue) {
    Vue.prototype.$loading = Loading
}

export default { Loading, install }