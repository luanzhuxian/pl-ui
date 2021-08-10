import PlSvg from './src/Svg.vue'

/* istanbul ignore next */
PlSvg.install = function(Vue) {
    Vue.component(PlSvg.name, PlSvg)
}

export default PlSvg
