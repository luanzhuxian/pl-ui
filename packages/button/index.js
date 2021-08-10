import PlButton from './src/Button.vue'

/* istanbul ignore next */
PlButton.install = function(Vue) {
    Vue.component(PlButton.name, PlButton)
}

export default PlButton
