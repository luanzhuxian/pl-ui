<template>
    <svg
        v-if="type === 'svg' && update"
        class="pl-svg"
        aria-hidden="true"
        @click="clickHandler"
        @hover="hoverHandler"
        :style="{
            width: truthWidth,
            height: truthHeight,
            verticalAlign: verticalAlign / 7.5 + 'vw'
        }"
    >
        <use :xlink:href="'#' + (tempName || name)" />
    </svg>
    <img
        v-else
        :src="name"
        :style="{
            width: width ? width / 7.5 + 'vw' : height ? 'auto' : 'none',
            height: height ? height / 7.5 + 'vw' : width ? 'auto' : 'none'
        }"
        alt=""
        @hover="hoverHandler"
        @click="clickHandler"
    >
</template>

<script>
export default {
    name: 'PlSvg',
    props: {
        name: {
            type: String,
            require: true,
            default: ''
        },
        fill: {
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: null
        },
        height: {
            type: [Number, String],
            default: null
        },
        // 可以是img,此时，name就是图片的src
        type: {
            type: String,
            default: 'svg'
        },
        verticalAlign: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {

            // svg id的副本
            tempName: '',
            computedWidth: null,
            computedHeight: null,
            update: true,
            clonedSvg: {},
            count: 0
        }
    },
    computed: {
        truthWidth () {
            if (this.width) {
                return `${ this.width / 7.5 }vw`
            }

            // 如果没设置宽，默认宽等于高
            if (this.height) {
                return `${ this.height / 7.5 }vw`
            }
            return null
        },
        truthHeight () {
            if (this.height) {
                return `${ this.height / 7.5 }vw`
            }

            // 如果没设置高，默认高等于宽
            if (this.width) {
                return `${ this.width / 7.5 }vw`
            }
            return null
        }
    },
    watch: {
        fill: {
            handler (val) {
                if (val) this.change(val)
            },
            immediate: true
        },
        name (val) {
            if (this.fill && val) {
                this.change(this.fill)
            } else {
                this.tempName = val
            }
        }
    },
    methods: {
        clickHandler (e) {
            this.$emit('click', e)
        },
        hoverHandler (e) {
            this.$emit('hover', e)
        },
        change (fill) {
            if (!this.name || !fill || this.type !== 'svg') return

            /**
             * 由于使用的是svg精灵，所以
             * 要使得fill属性生效，必须保证不存在行内fill属性 或者 修改行内fill属性
             * 如果直接修改行内属性，会改变全局所有的svg颜色
             * 所以，先复制一份svg，然后修改这个副本的颜色，使用完之后，再删除这个副本，避免副本越来越多
             */
            const svg = document.getElementById(this.name)
            if (!svg) {
                // 如果图标加载失败，再尝试3次
                if (this.count >= 3) {
                    console.error(`svg ${ this.name } 不存在`)
                    return
                }
                setTimeout(() => {
                    this.change(fill)
                    this.count++
                }, 1000)
                return
            }
            // 补全颜色值,用颜色作为新生成的图标id，这样，就可以保证相同颜色的图标可以复用
            let fillStr = String(fill).replace(/#/g, '')
            fillStr = fillStr.padEnd(6, fillStr)
            this.tempName = `${ this.name }-${ fillStr }`
            // 如果图标已经缓存，则不再生成新的图标
            if (window[this.tempName]) return
            // 标记已经生成的图标
            window[this.tempName] = true
            const clonedSvg = svg.cloneNode(true)
            clonedSvg.setAttribute('id', this.tempName)
            this.svgParent = svg.parentNode
            this.clonedSvg[this.tempName] = clonedSvg
            // 给克隆后的图标填充颜色
            try {
                const fills = clonedSvg.querySelectorAll('[fill]')
                const colors = clonedSvg.querySelectorAll('[color]')
                clonedSvg.setAttribute('fill', fill)
                for (const fillEle of fills) {
                    if (fillEle.getAttribute('fill') !== 'none') {
                        fillEle.setAttribute('fill', fill)
                    }
                }
                for (const color of colors) {
                    color.setAttribute('color', fill)
                }
            } catch (e) {
                console.error(`svg ${ this.name } 不存在`)
            }
            svg.parentNode.appendChild(clonedSvg)
        },
        clean () {
            if (this.type !== 'svg') return
            if (this.svgParent) {
                for (const k of Object.keys(this.clonedSvg)) {
                    this.svgParent.removeChild(this.clonedSvg[k])
                }
            }
            this.clonedSvg = {}
        }
    }
}
</script>

<style module lang="scss">
    .pl-svg {
      vertical-align: -4px;
    }
</style>
