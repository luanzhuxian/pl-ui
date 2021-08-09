import ElButton from './src/Button.vue'

/* istanbul ignore next */
ElButton.install = function(Vue) {
    Vue.component(ElButton.name, ElButton)
}

export default ElButton
