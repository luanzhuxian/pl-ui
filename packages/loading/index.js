import Loading from './src/main.js'

Loading.install = function(Vue) {
    Vue.prototype.$loading = Loading
}

export default Loading