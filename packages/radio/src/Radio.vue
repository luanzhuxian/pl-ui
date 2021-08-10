<template>
    <div
        role="radio"
        class="pl-radio"
        :class="{
            'pl-radio__inline': inline,
            [`pl-radio__${size}`]: true
        }"
        :style="{ '--align': align }"
        @click="onClick"
    >
        <div v-if="position === 'left'" class="pl-radio-icon pl-radio-icon__left">
            <pl-svg
                name="icon-weixuanzhong1"
                width="36"
            />
        </div>
        <div class="pl-radio-content">
            <slot />
        </div>
        <div v-if="position === 'right'" class="pl-radio__icon pl-radio-icon__right">
            <pl-svg
                v-show="!checked"
                name="icon-weixuanzhong1"
                width="36"
            />
            <pl-svg
                v-show="checked"
                name="icon-xuanzhong"
                width="36"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlRadio',
    props: {
        // 选择按钮的位置 left or right
        position: {
            type: String,
            default: 'right'
        },
        // 按钮与内容的对齐反射方式
        align: {
            type: String,
            default: 'space-between'
        },
        inline: Boolean,
        // 要绑定的值
        label: {
            type: [String, Number, Boolean, Object, Array],
            default () {
                return null
            }
        },
        size: {
            type: String,
            default: 'small'
        },
        // 绑定的值
        value: {
            type: [String, Number, Boolean, Object, Array],
            default () {
                return null
            }
        },
        /**
         * 是否可以被取消, 如果可以，在取消时将使用传入的值
         * 此时radio的表现有点类似checkbox
         */
        cancelValue: {
            type: [Boolean, Object, Array, String, Number],
            default: undefined
        }
    },
    inject: {
        values: {
            from: 'values',
            default: null
        },
        changeHandler: {
            from: 'changeHandler',
            default: null
        }
    },
    model: {
        event: 'change',
        prop: 'value'
    },
    computed: {
        id () {
            const { _uid: uid } = this
            return `pl-radio_${ uid }`
        },
        checked () {
            if (this.values) {
                return this.label === this.values.defaultValue
            }
            return this.label === this.value
            // return this.label === this.value || this.label === (this.values ? this.values.defaultValue : null)
        }
    },
    methods: {
        onClick () {
            let val = this.label
            if (this.cancelValue !== undefined && this.checked) {
                val = this.cancelValue
            }
            this.$emit('change', val)
            if (this.changeHandler) {
                this.changeHandler(val)
            }
        }
    }
}
</script>

<style lang="scss">
    @import "../../../src/assets/scss/form.scss";
    
    .pl-radio {
        display: flex;
        flex: 1;
        justify-content: var(--align);
        align-items: center;
        > .pl-radio-content {
            margin-right: 10px;
            width: 100%;
        }
        &__inline {
            flex: none;
            display: inline-flex;
            &:nth-of-type(n+2) {
                margin-left: 20px;
            }
            > .pl-radio-content {
                width: max-content;
            }
        }
        &__mini {
            min-height: $--form-min-height;
        }
        &__small {
            min-height: $--form-small-height;
            > .pl-radio-content {
                font-size: $--form-small-font-size;
            }
        }
        &__middle {
            min-height: $--form-middle-height;
            > .pl-radio-content {
                font-size: $--form-middle-font-size;
            }
        }
    }
</style>
