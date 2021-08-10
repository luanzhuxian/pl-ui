const App = {
    template: `
        <pl-form>
            <pl-form-item border>
                <pl-input
                    prefix-icon="icon-mobile"
                    type="number"
                    v-model="form.mobile"
                    placeholder="请输入您的手机号"
                />
            </pl-form-item>

            <pl-form-item>
                <pl-input
                    prefix-icon="icon-code"
                    v-model="form.code"
                    placeholder="请输入验证码"
                />
            </pl-form-item>
        </pl-form>
    `,
    data () {
        return {
            form: {
                mobile: '',
                code: ''
            }
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