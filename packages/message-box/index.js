import MessageBox from './src/main.js'

const { confirm, alert, propmt } = MessageBox

MessageBox.install = function(Vue) {
    Vue.prototype.$confirm = confirm
    Vue.prototype.$alert = alert
    Vue.prototype.$propmt = propmt
}

export default MessageBox