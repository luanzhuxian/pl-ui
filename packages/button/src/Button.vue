<template>
    <button
        :class="{
            'pl-button': true,
            [`pl-button__${type}`]: true,
            [`pl-button__${size}`]: true,
            'round': round,
            'plain': plain,
            'shadow': shadow
        }"
        :style="{ background: backgroundColor }"
        :disabled="disabled || loading"
        @click.stop="handleClick"
    >
        <slot name="prefix" />
        <span>
            <i v-show="loading" class="mall-ui-icon mall-ui-loading pl-button__loading" />
            <slot>{{ text }}</slot>
        </span>
        <slot name="suffix" />
    </button>
</template>

<script>
export default {
    name: 'PlButton',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'small'
        },
        disabled: Boolean,

        // 是否圆角
        round: Boolean,

        // 是否朴素
        plain: Boolean,
        text: {
            type: String,
            default: ''
        },
        loading: Boolean,
        shadow: Boolean,
        backgroundColor: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick (e) {
            this.$emit('click', e)
        }
    }
}
</script>

<style lang="scss">
  .pl-button {
    position: relative;
    border: none;
    outline: none;
    text-align: center;
      box-sizing: border-box;
    span {
      display: inline-block;
      vertical-align: bottom;
    }
    &:disabled {
      background-color: #ccc !important;
      color: #fefefe !important;
    }
    /* 有阴影的 */
    &.shadow {
      box-shadow: 0 4px 20px rgba(153, 153, 153, 0.2);
    }
    /* 默认的 */
    &__default {
      background-color: $--font-color_gray3;
      color: #fff;
      &:active {
        background-color: $--font-color_gray3;
      }
      &.plain {
        color: #666;
        background-color: transparent;
        border: 1px solid #666;
      }
    }
    /* 主色调 */
    &__primary {
      background-color: $--primary-color;
      color: #fff;
      &:active {
        background-color: $--primary-color;
      }
      &.plain {
        color: $--primary-color;
        background-color: #FFF8F9;
        border: 1px solid #FE7700;
      }
    }
    /* 警告色 */
    &__warning {
      background-color: $--warning-color;
      color: #fff;
      &:active {
        background-color: $--warning-color-active;
        color: #ccc;
      }
      &.plain {
        color: $--warning-color;
        background-color: $--primary-color;
      }
    }
    /* 红色 */
    &__danger {
      background-color: #D2524C;
      color: #fff;
      &:active {
        background-color: #D2524C;
      }
      &.plain {
        color: #D2524C;
        background-color: transparent;
        border: 1px solid #D2524C;      }
    }
    /* 蓝色 */
    /*&__primary {
      background-color: #12B7F5;
      color: #fff;
      &:active {
        background-color: #12B7F5;
      }
      &.plain {
        color: #12B7F5;
        background-color: transparent;
        border: 1px solid #12B7F5;      }
    }*/
    &__text {
      background-color: transparent;
      font-size: 26px;
      color: $--primary-color;
      padding: 0 !important;
      margin: 0 !important;
    }
    &__mini {
      padding: 0 18px;
      height: 40px;
        line-height: 40px;
      font-size: 16px;
      border-radius: 10px;
      &.round {
        border-radius: 20px;
      }
      &.plain {
        border: 1px solid currentColor;
        border-radius: 20px;
      }
      .pl-button__prefix-icon, .pl-button__loading {
          font-size: 20px;
          margin-right: 6px;
        vertical-align: -4px;
        color: currentColor;
      }
    }
    /* small */
    &__small {
      padding: 0 22px;
      line-height: 50px;
        height: 50px;
      font-size: 22px;
      border-radius: 10px;
      &:nth-of-type(n + 1) {
        margin-right: 10px;
      }
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      &.round {
        border-radius: 25px;
      }
      .pl-button__prefix-icon, .pl-button__loading {
          font-size: 24px;
          margin-right: 6px;
          vertical-align: -4px;
          color: currentColor;
      }
    }
    /* middle */
    &__middle {
      padding: 0 32px;
      line-height: 60px;
        height: 60px;
      font-size: 28px;
      border-radius: 12px;
      &:nth-of-type(n + 1) {
        margin-right: 10px;
      }
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      &.round {
        border-radius: 31px;
      }
      .pl-button__prefix-icon, .pl-button__loading {
          font-size: 26px;
          margin-right: 8px;
          vertical-align: -4px;
        color: currentColor;
      }
    }
    /* large */
    &__large {
      width: 100%;
      height: 80px;
        line-height: 80px;
      font-size: 28px;
      border-radius: 20px;
      text-align: center;
      .pl-button__prefix-icon, .pl-button__loading {
          font-size: 35px;
        margin-right: 10px;
        color: currentColor;
        vertical-align: -8px;
      }
      &.round {
        border-radius: 40px;
      }
    }
    /* huge */
    &__huge {
      width: 100%;
      height: 108px;
        line-height: 108px;
      font-size: 36px;
      border-radius: 20px;
      text-align: center;
      .pl-button__prefix-icon, .pl-button__loading {
          font-size: 35px;
        margin-right: 10px;
        vertical-align: -5px;
        color: currentColor;
      }
    }
    /* larger */
    &__larger {
      width: 100%;
      height: 90px;
      font-size: 32px;
      border-radius: 10px;
      text-align: center;
      .pl-button__prefix-icon, .pl-button__loading {
        width: 35px;
        height: 35px;
        margin-right: 5px;
        fill: currentColor;
        vertical-align: -7px;
      }
    }
  }

  .pl-button__loading:before {
      display: inline-block;
    animation: rotate 1.5s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0) }
    to { transform: rotate(180deg) }
  }
</style>
