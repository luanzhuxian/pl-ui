import PlPopup from './src/Popup.vue'

/* istanbul ignore next */
PlPopup.install = function(Vue) {
    Vue.component(PlPopup.name, PlPopup)
}

export default PlPopup
