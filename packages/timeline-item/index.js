import PlTimelineItem from '../timeline/src/Timeline-Item.vue'

/* istanbul ignore next */
PlTimelineItem.install = function(Vue) {
    Vue.component(PlTimelineItem.name, PlTimelineItem)
}

export default PlTimelineItem