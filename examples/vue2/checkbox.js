const App = {
    template: `
        <div>
            <div>{{ '已选：' + selected }}</div>
            <pl-checkbox-group v-model="val" @change="onChange">
                <pl-checkbox
                    v-for="(item, i) of list"
                    :key="i"
                    :data="item"
                    :disabled="item.disabled"
                    :gap-column="24"
                    border
                >
                    <template slot="suffix">
                        <span>{{ item.name }}</span>
                    </template>
                </pl-checkbox>
            </pl-checkbox-group>
        </div>
    `,
    data () {
        return {
            val: [],
            list: [
                {
                    id: 1,
                    name: 'Angular',
                    checked: false,
                    disabled: true
                }, {
                    id: 2,
                    name: 'React',
                    checked: false,
                    disabled: false
                }, {
                    id: 3,
                    name: 'Vue',
                    checked: false,
                    disabled: false
                }
            ]
        }
    },
    computed: {
        selected () {
            return this.val.map(item => item.name).toString()
        }
    },
    methods: {
        onChange (selected) {
            console.log(selected)
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