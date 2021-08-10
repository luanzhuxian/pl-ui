<template>
    <div
        :class="$style.tabContainer"
        @touchstart="startDrag"
        @mousedown="startDrag"
        @touchmove="onDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @touchend="endDrag"
    >
        <div
            ref="wrapper"
            :class="$style.tabContainerWrapper"
        >
            <slot />
        </div>
    </div>
</template>

<script>
import { once } from '../../../src/assets/js/util'

/**
 * tab-container
 * @desc 面板，搭配 tab-container-item 使用
 * @module components/tab-container
 *
 * @param {number|string} [value] - 当前激活的 tabId
 *
 * @example
 * <tab-container v-model="selected">
 *   <tab-container-item id="1"> 内容A </tab-container-item>
 *   <tab-container-item id="2"> 内容B </tab-container-item>
 *   <tab-container-item id="3"> 内容C </tab-container-item>
 * </tab-container>
 */
export default {
    name: 'PlTabContainer',
    props: {
        value: {
            type: String,
            default: ''
        },
        swipeable: Boolean
    },
    data () {
        return {
            start: {
                x: 0,
                y: 0
            },
            swiping: false,
            wrapper: null,
            currentTab: this.value,
            currentIndex: null,
            offsetLeft: 0,
            pageWidth: 0,
            // 最小滑动距离，小于该距离不滑到下一页
            limitWidth: 0
        }
    },
    watch: {
        // string
        value (val) {
            this.currentTab = val
        },
        currentTab (val, oldVal) {
            this.$emit('input', val)
            if (!this.swipeable) return

            // TODO: 非拖拽，点击 tab 切换，需要先回到上次的位置
            const lastIndex = this.$children.findIndex(child => child.id === oldVal)
            this.swipeLeaveTransition(lastIndex)
        }
    },
    mounted () {
        if (!this.swipeable) return

        this.wrapper = this.$refs.wrapper
        this.pageWidth = this.wrapper.clientWidth || document.documentElement.clientWidth
        this.limitWidth = this.pageWidth / 4
    },
    methods: {
        swipeMove (offset) {
            this.wrapper.style.webkitTransform = `translate3d(${ offset }px, 0, 0)`
            this.swiping = true
        },

        // 实现过渡滑动
        swipeLeaveTransition (lastIndex = 0) {
            // 非拖拽，点击 tab 切换，currentIndex 是 null
            if (typeof this.currentIndex !== 'number') {
                this.currentIndex = this.$children.findIndex(child => child.id === this.currentTab)
                this.swipeMove(-lastIndex * this.pageWidth)
            }

            setTimeout(() => {
                // 下个 tick 才滑动
                this.wrapper.classList.add('swipe-transition')
                this.swipeMove(-this.currentIndex * this.pageWidth)

                once(this.wrapper, 'webkitTransitionEnd', () => {
                    this.wrapper.classList.remove('swipe-transition')
                    this.wrapper.style.webkitTransform = ''
                    this.swiping = false
                    this.currentIndex = null
                })
            }, 0)
        },

        startDrag (evt) {
            if (!this.swipeable) return

            // 记录当前第一根手指的标识符
            const e = evt.changedTouches ? evt.changedTouches[0] : evt
            this.dragging = true
            this.start.x = e.pageX
            this.start.y = e.pageY
        },

        onDrag (evt) {
            if (!this.dragging) return

            const e = evt.changedTouches ? evt.changedTouches[0] : evt
            const offsetTop = e.pageY - this.start.y
            const offsetLeft = e.pageX - this.start.x
            const y = Math.abs(offsetTop)
            const x = Math.abs(offsetLeft)
            const COEFFICIENT = 1.73

            // 根据滑动的 x、y 距离，判断是否可以滑动
            const swiping = !(x < 10 || y > 200 || (x >= 10 && y >= x * COEFFICIENT))
            if (!swiping) return
            evt.preventDefault()

            const length = this.$children.length - 1
            const index = this.$children.findIndex(child => child.id === this.currentTab)
            // 当前tab页相对于wrapper左侧的距离，即左侧所有其他tab的宽度
            const currentPageOffset = index * this.pageWidth
            // 当前拖动时刻，wrapper的偏移量
            const offset = offsetLeft - currentPageOffset
            const absOffset = Math.abs(offset)

            // 已经是最后一个tab了，禁止再继续左滑 || 已经是第一个tab了，禁止再右滑
            if (absOffset > length * this.pageWidth || (offset > 0 && offset < this.pageWidth)) {
                // console.log('onDrag', 'absOffset > length * this.pageWidth', absOffset, length, this.pageWidth)
                // console.log('onDrag', 'offset > 0 && offset < this.pageWidth', offset > 0 && offset < this.pageWidth)
                this.swiping = false
                return
            }

            this.offsetLeft = offsetLeft
            this.currentIndex = index
            this.swipeMove(offset)
        },

        endDrag () {
            if (!this.swiping) return

            this.dragging = false
            const direction = this.offsetLeft > 0 ? -1 : 1

            // 是都大于最小滑动距离，是否可以滑动到下一页
            if (Math.abs(this.offsetLeft) > this.limitWidth) {
                this.currentIndex += direction
                const child = this.$children[this.currentIndex]
                if (child) {
                    this.currentTab = child.id
                    return
                }
            }

            // 滑动距离不够则滑回当前页
            this.swipeLeaveTransition()
        }
    }
}
</script>

<style lang="scss">
    .tab-container {
        position: relative;
        overflow: hidden;

        &-wrapper {
            display: flex;
            width: 100%;
        }
    }
    .swipe-transition {
        transition: transform 150ms ease-in-out;
    }
</style>
