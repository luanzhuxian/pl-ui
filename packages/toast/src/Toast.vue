<template>
    <transition name="show-pl-toast">
        <div
            class="pl-toast"
            :class="{ 'pl-toast-visible': show }"
            v-show="show"
            :style="{'--animationDuration': animationDuration}"
        >
            <i
                v-if="type === 'success'"
                class="pl-toast-icon mall-ui-icon mall-ui-success"
            />
            <i
                v-if="type === 'error'"
                class="pl-toast-icon mall-ui-icon mall-ui-shibai"
            />
            <i
                v-if="type === 'warning'"
                class="pl-toast-icon mall-ui-icon mall-ui-jinggao"
            />
            <div class="toast-message">
                <p v-html="message" />
                <p class="toast-vice-message" v-html="viceMessage" />
                <slot />
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PlToast',
    data () {
        return {
            show: false,
            message: '',
            viceMessage: '',
            timer: 0,
            type: '',
            animationDuration: '0.4s'
        }
    },
    methods: {
        close () {
            this.show = false
            setTimeout(() => {
                const el = this.$el
                this.$destroy()
                document.body.removeChild(el)
            }, Number.parseFloat('0.4s') * 1000)
        }
    }
}
</script>

<style lang="scss">
    .pl-toast {
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 90vw;
        transform: translate(-50%, -50%);
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        padding: 58px 62px;
        word-break: keep-all;
        background-color: rgba(0, 0, 0, .7);
        color: #fff;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;
        z-index: 9999;

        &.pl-toast-visible {
            /*animation: pl-toast-animation .4s;*/
            /*animation-fill-mode: forwards;*/
        }
        &-icon {
            font-size: 72px;
        }

        .toast-message {
            width: max-content;
            max-width: 100%;
            margin-top: 16px;
            font-size: 32px;
            line-height: 48px;
            word-break: break-all;
            white-space: pre-wrap;

            .toast-vice-message {
                width: max-content;
                max-width: 100%;
                margin-top: 4px;
                font-size: 24px;
                word-break: break-all;
                white-space: pre-wrap;
            }
        }
    }
    @keyframes pl-toast-animation {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        70% { transform: translate(-50%, -50%) scale(0.95); }
        90% { transform: translate(-50%, -50%) scale(1.02); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes pl-toast-animation-backof {
        0% { transform: translate(-50%, -50%) scale(1); }
        30% { transform: translate(-50%, -50%) scale(0.8); }
        80% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(0); }
    }
    .show-pl-toast-enter-active {
        animation: pl-toast-animation var(--animationDuration);
        animation-fill-mode: backwards;
    }
    .show-pl-toast-leave-active {
        animation: pl-toast-animation-backof var(--animationDuration);
        animation-fill-mode: forwards;
    }
    .show-pl-toast-leave, .show-pl-toast-enter-to {
        transform: translate(-50%, -50%) scale(1);
    }
    .show-pl-toast-enter, .show-pl-toast-leave-to {
        transform: translate(-50%, -50%) scale(0);
    }
</style>
