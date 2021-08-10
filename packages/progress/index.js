import PlProgress from './src/Progress.vue'

/* istanbul ignore next */
PlProgress.install = function(Vue) {
    Vue.component(PlProgress.name, PlProgress)
}

export default PlProgress
