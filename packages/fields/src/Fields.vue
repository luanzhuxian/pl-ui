<template>
    <div class="pl-fields">
        <div
            :class="'pl-fields_box ' + size"
            @click="handleClick"
        >
            <div class="pl-fields_text">
                <span
                    v-if="text"
                    v-text="text"
                />
                <slot v-else />
            </div>
            <div class="pl-fields_right" @click.stop="fieldsRightClick">
                <span
                    v-if="rightText"
                    class="pl-fields_right_text"
                    v-text="rightText"
                />
                <slot v-else name="right-content" />
                <i
                    v-if="canClick"
                    :class="{
                        'is-collapse': canCollapse && collapse,
                        'no-collapse': canCollapse && !collapse
                    }"
                    class="pl-fields__click-icon mall-ui-icon mall-ui-arrowright"
                />
            </div>
        </div>

        <transition name="collapse">
            <div v-show="$slots.collapse && canCollapse ? collapse : true">
                <slot name="collapse" />
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'PlFields',
    data () {
        return {
            collapse: false
        }
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        rightText: {
            type: String,
            default: ''
        },
        route: {
            type: Object,
            default () {
                return null
            }
        },
        size: {
            type: String,
            default: 'large'
        },

        // 支持展开slot
        canCollapse: Boolean,
        // 是否支持点击
        canClick: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        hasSlot () {
            return Boolean(this.$slots.collapse)
        }
    },
    methods: {
        handleClick () {
            if (this.canClick) {
                this.$emit('click')
                if (this.route) {
                    this.$router.push(this.route)
                }
            }
        },
        fieldsRightClick () {
            if (this.canClick) {
                this.$emit('click')
                if (this.route) {
                    this.$router.push(this.route)
                }
                if (this.canCollapse) {
                    this.collapse = !this.collapse
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .pl-fields {
        position: relative;
        background-color: #fff;
        &__click-icon {
            display: inline-block;
            margin-left: 10px;
            font-size: 20px;
            color: #999;
            transition: transform .2s linear;
            &.no-collapse {
                transform: rotate(90deg);
            }
            &.is-collapse {
                transform: rotate(-90deg);
            }
        }
    }
    .pl-fields_box {
        position: relative;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
        &.large {
            height: 100px;
        }
        &.middle {
            height: 88px;
        }
        &.small {
            height: 70px;
        }
    }
    .pl-fields_text {
        font-size: 28px;
        flex: 1;
    }
    .pl-fields_right {
        display: flex;
        align-items: center;
        .pl-fields_right_text {
            font-size: 28px;
            color: #999;
        }
    }
</style>
