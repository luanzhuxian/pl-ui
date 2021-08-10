const App = {
    template: `
        <div>
            <div>{{ '已选：' + selected }}</div>
            <pl-button type="primary" size="large" @click="show = true">
                点我
            </pl-button>
            <pl-popup title="选择你喜爱的框架" :show.sync="show">
                <div>
                    <pl-radio-group v-model="val">
                        <pl-radio
                            v-for="k of Object.keys(map)"
                            :label="k"
                            :key="k"
                        >
                            <div v-text="map[k]" />
                        </pl-radio>
                    </pl-radio-group>
                    <pl-button size="large" type="warning" @click="confirm">
                        确定
                    </pl-button>
                </div>
            </pl-popup>
        </div>
    `,
    data () {
        return {
            show: false,
            val: 1,
            map: {
                1: 'Angular',
                2: 'React',
                3: 'Vue'
            },
            selected: ''
        }
    },
    methods: {
        confirm () {
            this.selected = this.map[this.val]
            this.show = false
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