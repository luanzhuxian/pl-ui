const App = {
    template: `
        <div>
            <div>{{ '已选：' + selected }}</div>
            <pl-button type="primary" size="large" @click="show = true">
                点我
            </pl-button>
            <pl-picker
                :show.sync="show"
                :slots="pickerColumns"
                @confirm="confirm"
            />
        </div>
    `,
    data () {
        return {
            show: false,
            pickerColumns: [
                {
                    flex: 1,
                    values: ['不想买了', '信息填写错误，重新拍', '线下自提', '其他原因'],
                    textAlign: 'center'
                }
            ],
            selected: ''
        }
    },
    methods: {
        confirm (selected) {
            console.log(selected)
            this.selected = selected.toString()
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