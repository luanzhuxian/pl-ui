<template>
    <div :class="['pl-tab' + ` pl-tab__${size}`]">
        <div
            v-for="(item, i) of tabs"
            :key="i"
            class="pl-tab__pane"
            :class="{ active: item[options.id] === currentId,'color9': color9 }"
            @click="handleClick(item)"
        >
            {{ item[options.name] }}
            <slot :name="'tab-pane-' + i" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlTab',
    props: {
        tabs: {
            type: Array,
            default () {
                return []
            }
        },
        options: {
            type: Object,
            default () {
                return {
                    name: 'name',
                    id: 'id'
                }
            }
        },
        size: {
            type: String,
            default: 'large'
        },
        activeId: {
            type: [String, Number],
            default: ''
        },
        count: {
            type: Object,
            default: null
        },
        color9: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentId: null
        }
    },
    watch: {
        activeId () {
            this.currentId = this.activeId
        }
    },
    mounted () {
        this.currentId = this.activeId
    },
    methods: {
        handleClick (item) {
            if (this.currentId !== item[this.options.id]) {
                this.currentId = item[this.options.id]
                this.$emit('change', item)
            }
            this.$emit('update:activeId', this.currentId)
        }
    }
}
</script>

<style lang="scss">
  .color9 {
    color: #999999;
  }
  .pl-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #333;
    background-color: #fff;
    &.pl-tab__small {
      font-size: 26px;
      > div {
        height: 80px;
        line-height: 80px;
      }
    }
    &.pl-tab__middle {
      font-size: 30px;
      > div {
        height: 90px;
        line-height: 90px;
      }
    }
    &.pl-tab__large {
      font-size: 32px;
      > div {
        height: 100px;
        line-height: 100px;
      }
    }
    &__pane {
      position: relative;
        padding: 0 10px;
        &:after {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 3px;
        width: 100%;
        background-color: #F2B036;
      }
      &.active {
        color: #F2B036;
        &:after {
          content: '';
        }
      }
    }
  }
</style>
