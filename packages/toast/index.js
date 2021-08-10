import Toast from './src/main.js'

const { toast, success, error, warning } = Toast

Toast.install = function(Vue) {
    Vue.prototype.$toast = toast
    Vue.prototype.$success = success
    Vue.prototype.$error = error
    Vue.prototype.$warning = warning
}

export default Toast
