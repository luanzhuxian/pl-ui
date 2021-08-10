<template>
    <div ref="loadMore" :class="$style.loadMore">
        <div
            ref="pullLoading"
            :class="{ [$style.pullLoading]: true }"
            :style="{ '--top': `${top / 7.5}vw`, '--rotate': `${rotate}deg`}"
        >
            <svg
                :class="{
                    [$style.pullLoadingIcon]: true,
                    [$style.rotate]: pending
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="32"
                height="32"
                :fill="top > minPullDis ? '#fe7700' : '#a99d99'"
            >
                <path
                    opacity=".25"
                    d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
                />
                <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" />
            </svg>
        </div>
        <div
            ref="container"
            :class="$style.loadMoreContainer"
        >
            <slot
                :list="list"
                :total="total"
                :loading="pending"
            />
            <svg
                v-if="bottomLoading"
                :class="{
                    [$style.bottomLoadingIcon]: true,
                    [$style.btoRotate]: pending
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                style="display: block;"
                fill="#fe7700"
            >
                <path
                    opacity=".25"
                    d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
                />
                <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
                    <!--<animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="0.8s" repeatCount="indefinite" />-->
                </path>
            </svg>
            <p
                v-if="!isNotShowNoMoreTip && allLoaded && list.length > 0"
                :class="$style.noMore"
            >
                没有更多了~
            </p>
            <div
                v-if="list.length === 0 && !pending"
                :class="$style.noContent"
            >
                <PlSvg
                    v-if="!noIcon && !$slots.icon"
                    :name="icon"
                    width="300"
                    height="200"
                />
                <slot v-else name="icon" />
                <p
                    :class="$style.noContentTip"
                    v-text="noContentTip"
                />
            </div>
        </div>
    </div>
</template>

<script>
// 使用前必须保证滚动容器是window

import { throttle } from '../../../src/assets/js/util'

export default {
    name: 'PlLoadMore',
    props: {
        // 如果为true，组件将显示loading状态，起到从外部控制组件加载状态的作用
        loading: Boolean,
        // 请求参数，必须包含：current: 页码
        form: {
            type: Object,
            required: true,
            default () {
                return {
                    current: 1
                }
            }
        },
        // 请求方法
        requestMethods: {
            type: Function,
            required: true
        },
        noContentTip: {
            type: String,
            default: '暂无内容'
        },
        icon: {
            type: String,
            default: 'icon-no-content'
        },
        noIcon: Boolean,
        // 不显示‘没有更多了’提示true, 显示false
        isNotShowNoMoreTip: Boolean,
        // 禁止下拉事件
        noPullRefresh: Boolean,
        // 如果函数返回false, 则刷新不会触发，可用来拦截刷新动作
        beforeRefresh: {
            type: Function,
            default: null
        }
    },
    data () {
        return {
            // 请求参数 form 的 copy
            options: null,
            // request 返回的列表，在外部可通过作用域插槽获得
            list: [],
            // request 返回的分页的总数，在外部可通过作用域插槽获得
            total: 0,
            // 列表的高度，用来判断是否上拉滚动到底
            offsetHeight: 0,
            // 触摸事件手指标识符
            identifier: 0,
            // 触摸事件手指位置
            startY: 0,

            // 组件内部的 loading，在外部可通过作用域插槽获得
            pending: false,
            // 已全部加载完毕
            allLoaded: false,

            /* 顶部下拉刷新相关 */
            // 正在向下拉动
            pulling: false,
            // 顶部 loading 距顶部的默认值
            defaultTop: -90,
            // 顶部 loading 距顶部的值，动态变化的
            top: -90,
            // 记录顶部 loading 旋转的角度
            rotate: 0,
            // 下拉刷新最小触发距离
            minPullDis: 60,

            bottomLoading: false,

            // 保存节流后的滚动事件回调
            scrollHandler: null,
            // 缓存发起的所有请求
            requestBuffer: []

        }
    },
    computed: {
        pullLoading () {
            return this.$refs.pullLoading
        },
        container () {
            return this.$refs.container
        },
        empty () {
            return this.list.length === 0
        }
    },
    watch: {
        form: {
            handler () {
                this.options = JSON.parse(JSON.stringify(this.form))
            },
            immediate: true,
            deep: true
        },
        empty (val) {
            this.$emit('listState', val)
        }
    },
    // 事件绑定
    activated () {
        const el = this.$el
        // 允许下拉刷新，添加移动端触摸事件
        // passive: true 是否让 阻止默认行为(preventDefault()) 失效
        if (!this.noPullRefresh) {
            el.addEventListener('touchstart', this.touchstart, { passive: true })
            el.addEventListener('touchmove', this.touchMove)
            el.addEventListener('touchend', this.touchend, { passive: true })
        }
        // 滚动事件
        if (!this.scrollHandler) {
            // 延迟绑定滚动事件
            // 因为如果其它页面如果滚动过一段距离，当路由切换的时候，会从新滚动到0的位置，会触发一次滚动事件
            setTimeout(() => {
                this.bindScroll()
            }, 200)
        }
    },
    deactivated () {
        const el = this.$el
        el.removeEventListener('touchstart', this.touchstart)
        el.removeEventListener('touchmove', this.touchMove)
        el.removeEventListener('touchend', this.touchend)
        window.removeEventListener('scroll', this.scrollHandler)
        this.scrollHandler = null
        this.offsetHeight = 0
    },
    beforeDestroy () {
        const el = this.$el
        el.removeEventListener('touchstart', this.touchstart)
        el.removeEventListener('touchmove', this.touchMove)
        el.removeEventListener('touchend', this.touchend)
        window.removeEventListener('scroll', this.scrollHandler)
        this.scrollHandler = null
        this.offsetHeight = 0
    },
    methods: {
        async getData () {
            try {
                this.$emit('update:loading', true)
                this.pending = true
                const { result } = await this.requestMethods(this.options)
                if (result.records.length === 0) {
                    this.allLoaded = true
                }
                this.total = result.total
                return result.records
            } catch (e) {
                throw e
            } finally {
                this.loaded()
            }
        },
        // 本次请求完成，设置 top loading 的位置为初始状态，并重新求得列表的高度
        loaded () {
            this.$nextTick(() => {
                this.$nextTick(() => {
                    this.pullLoading.style.transition = 'transform .5s ease-in-out'
                    this.top = this.defaultTop
                    this.offsetHeight = this.$el.offsetHeight

                    // 如果因为一些原因过渡没有被取消，0.6s后强行取消
                    setTimeout(() => {
                        this.pullLoading.style.transition = null
                        this.rotate = 0
                        this.pending = false
                        this.$emit('update:loading', false)
                    }, 600)
                })
            })
        },
        resetState () {
            this.options.current = 1
            this.allLoaded = false
            this.pulling = false
            this.bottomLoading = false
            this.top = 100
            window.scrollTo(0, 0)
        },
        // 刷新，给外部通过 $refs.loadMore.refresh 使用的
        async refresh () {
            if (this.pending || this.loading) {
                return
            }
            try {
                await this.$nextTick()
                this.resetState()
                this.list = await this.getData()
                // 将结果传出去
                this.$emit('refresh', this.list, this.total)
            } catch (e) {
                throw e
            }
        },

        // 滚动事件
        bindScroll () {
            this.$nextTick(() => {
                this.offsetHeight = this.$el.offsetHeight
                // 生成滚动监听回调
                // 不要写成这样 window.addEventListener('scroll', throttle(this.infiniteScroll, 200))
                // 不然每次触发 scroll 事件都会执行一次节流
                this.scrollHandler = throttle(this.infiniteScroll, 200)
                window.addEventListener('scroll', this.scrollHandler, { passive: true })
            })
        },

        /**
         * 上拉加载下一页
         * @param offsetHeight 列表高度
         * @param scrollTop 滚动条距顶部高度
         * @param clientHeight 窗口高度
         */
        async infiniteScroll (e, offsetHeight = this.offsetHeight, scrollTop = window.scrollY, clientHeight = window.innerHeight) {
            // console.log(
            //     this.offsetHeight,
            //     window.scrollY,
            //     window.innerHeight,
            //     this.pending,
            //     this.allLoaded
            // )
            if (offsetHeight === 0) return
            if (offsetHeight - scrollTop - clientHeight <= 0 && !this.pending && !this.allLoaded) {
                this.options.current++
                try {
                    this.bottomLoading = true
                    const list = await this.getData()
                    for (const item of list) {
                        this.list.push(item)
                    }
                    this.$emit('more', this.list, this.total, list)
                    this.bottomLoading = false
                } catch (e) {
                    this.bottomLoading = false
                    throw e
                }
            }
        },

        // 下拉刷新开始
        touchstart (e) {
            const touches = Array.from(e.touches)
            if (touches.length > 1) return
            // 记录当前第一根手指的标识符
            this.identifier = touches[0].identifier
            this.startY = e.touches[0].clientY
        },
        // 下拉过程中，顶部的 top loading 被拉下来，移动的距离是手指滑动距离的 1/3
        touchMove (e) {
            const touches = Array.from(e.touches)
            // 超过两根手指触碰
            if (this.pending) return
            if (touches.length > 1) return
            // 判断松开的手指是不是第一次按下的手指
            const finger = touches.find(item => item.identifier === this.identifier)
            const deltaY = (finger.clientY - this.startY) / 3

            // console.log(deltaY)
            // console.log(finger.clientY - this.startY)
            // console.log(e.touches[0].identifier, this.identifier)
            // console.log(this.pending, this.pulling)

            // 如果使在顶部，并且是向下拉，禁止默认行为
            if (deltaY >= 0 && window.scrollY === 0) {
                e.stopPropagation()
                e.preventDefault()
                this.pulling = true
            }
            if (this.pulling && this.top <= 100) {
                e.preventDefault()
                e.stopPropagation()
                this.top = this.defaultTop + deltaY
            }
            this.rotate = deltaY
        },
        // 本次下拉动作结束
        async touchend (e) {
            const touches = Array.from(e.changedTouches)
            const finger = touches.find(item => item.identifier === this.identifier)
            if (this.pulling && finger) {
                this.startY = 0

                // 重置页码为1
                this.options.current = 1
                // allLoaded 全部加载完成设置为false，以便下次加载更多
                this.allLoaded = false
                // 表示下拉动作结束
                this.pulling = false

                // 为顶部loading设置过渡
                this.pullLoading.style.transition = 'transform linear .5s'

                // 只有在loading完成出现在视野中时，松开才发起请求
                if (this.top > this.minPullDis) {
                    // 下拉刷新前判断是否拦截
                    if (this.beforeRefresh && !this.beforeRefresh()) {
                        return
                    }
                    await this.$nextTick()
                    this.list = await this.getData()
                    // 将结果传出去
                    this.$emit('refresh', this.list, this.total)
                } else {
                    this.loaded()
                }
            }
        }
    }
}
</script>

<style module lang="scss">
.loadMore {
    position: relative;
    overflow: hidden;
}
.pullLoading {
    position: absolute;
    left: 50%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate3d(-50%, var(--top), 0) rotate(var(--rotate));
    background-color: #fff;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    z-index: 9;
    .pullLoadingIcon {
        width: 50px;
        height: 50px;
        &.rotate {
            animation: rotate .8s infinite linear;
        }
    }
}
.loadMoreContainer {
    min-height: 200px;
    .bottomLoadingIcon {
        margin: 30px auto 30px;
        width: 50px;
        height: 50px;
        &.btoRotate {
            animation: rotate .8s linear infinite;
        }
    }
}
.noMore {
    line-height: 90px;
    font-size: 28px;
    color: #999;
    text-align: center;
}
.noContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 200px;
}
.noContentTip {
    margin-top: 20px;
    font-size: 32px;
    color: #999;
}
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

</style>
