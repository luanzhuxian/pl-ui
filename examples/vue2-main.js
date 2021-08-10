const App = {
    // template: `
    //         <pl-button icon="el-icon-search" type="warning" @click="click">
    //             {{ message }}
    //         </pl-button>
    // `,
    data () {
        return {
            message: 'Hello Vue 3!!'
        }
    },
    watch: {
        message (val) {
            console.log('message change', this.message)
        }
    },
    methods: {
        click () {
            this.message = this.message.split('').reverse().join('')
        }
    },
    render (h) {
        return h(
            'pl-button', 
            {
                props: {
                    type: 'primary'
                },
                on: {
                    click: this.click
                }
            },
            this.message
        )
    }
}

const { ElButton } = PenglaiUI
console.log('Vue', Vue)
console.log('PenglaiUI', PenglaiUI)

Vue.use(PenglaiUI)

new Vue({
    el: '#app',
    render: h => h(App),
    renderError: (h, err) => {
        console.log(err)
    }
})