const App = {
    template: `
        <div>
            <pl-button size="large" @click="$toast({ type: 'success', message: '呵呵呵呵呵' })">
                默认
            </pl-button>
            <pl-button type="primary" size="large" @click="$success('呵呵呵呵呵')">
                成功
            </pl-button>
            <pl-button type="warning" size="large" @click="$error('呵呵呵呵呵')">
                失败
            </pl-button>
            <pl-button size="large" @click="$warning('呵呵呵呵呵')">
                警告
            </pl-button>
        </div>
    `,
    data () {
        return {}
    }
}

console.log('Vue', Vue)
console.log('PenglaiUI', PenglaiUI)

Vue.use(PenglaiUI)

new Vue({
    el: '#app',
    render: h => h(App)
})