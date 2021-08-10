const App = {
    template: `
        <div>
            <pl-tab
                size="small"
                :tabs="tabs"
                :active-id.sync="status"
                @change="onChange"
            />
            <div class="list">
                {{ status }}
            </div>
        </div>
    `,
    data () {
        return {
            status: 'ALL_ORDER',
            tabs: [
                { name: '全部', id: 'ALL_ORDER' },
                { name: '待付款', id: 'WAIT_PAY' },
                { name: '待发货', id: 'WAIT_SHIP' },
                { name: '待收货', id: 'WAIT_RECEIVE' },
                { name: '待评价', id: 'FINISHED' }
            ],
        }
    },
    created () {
        this.status = 'ALL_ORDER'
    },
    methods: {
        onChange (item) {
            console.log(item)
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