import PlTimeline from './src/Timeline.vue'

/* istanbul ignore next */
PlTimeline.install = function(Vue) {
    Vue.component(PlTimeline.name, PlTimeline)
}

export default PlTimeline