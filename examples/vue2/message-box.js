const App = {
    template: `
        <div>
            <pl-button type="primary" size="large" @click="onConfirm">
                确认
            </pl-button>
            <pl-button type="warning" size="large" @click="onAlert">
                警告
            </pl-button>
            <pl-button size="large" @click="onPrompt">
                带输入的
            </pl-button>
        </div>
    `,
    data () {
        return {}
    },
    methods: {
        onConfirm () {
            this.$confirm('呵呵呵呵呵')
        },
        onAlert () {
            this.$alert('呵呵呵呵呵')
        },
        onPrompt () {
            this.$propmt('呵呵呵呵呵')
        }
    }
}

console.log('Vue', Vue)
console.log('PenglaiUI', PenglaiUI)

Vue.use(PenglaiUI)

new Vue({
    el: '#app',
    render: h => h(App)
})