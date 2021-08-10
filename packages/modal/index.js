import PlModal from './src/Modal.vue'

/* istanbul ignore next */
PlModal.install = function(Vue) {
    Vue.component(PlModal.name, PlModal)
}

export default PlModal
