import PlCollapse from './src/Collapse.vue'

/* istanbul ignore next */
PlCollapse.install = function(Vue) {
    Vue.component(PlCollapse.name, PlCollapse)
}

export default PlCollapse