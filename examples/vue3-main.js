const { createApp, reactive, computed, watchEffect } = Vue
const { ElButton } = PenglaiUI
console.log('Vue', Vue)
console.log('PenglaiUI', PenglaiUI)

const App = {
    template: `
        <pl-button type="primary" @click="click">
            {{ state.message }}
        </pl-button>
    `,
    setup() {
        const state = reactive({
            message: 'Hello Vue 3!!'
        })

        watchEffect(() => {
            console.log('state change ', state.message)
        })

        function click() {
            state.message = state.message.split('').reverse().join('')
        }

        return {
            state,
            click
        }
    }
}

createApp(App)
    .use(PenglaiUI)
    // .use(ElButton)
    .mount('#app')