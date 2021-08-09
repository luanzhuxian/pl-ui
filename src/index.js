import './index.scss'
import Button from '../packages/button'

const components = [Button]

const install = function (Vue, opts = {}) {
    /* 安装所有组件 */
    for (const component of components) {
        if (!component.install) {
            component.install = function (Vue) {
                Vue.component(component.name, component)
            }
        }
        Vue.use(component)
    }

    /* 全局变量 */
    console.log('Vue.prototype', Vue.prototype)

    if (Vue.prototype) {
        Vue.prototype.$PL = {
            size: opts.size || '',
            zIndex: opts.size || 2000,
        }
    // Vue.prototype.$indicator = Indicator
    }
}

export default {
    version: '1.0.0',
    install,
    Button,
}
