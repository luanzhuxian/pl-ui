import './assets/scss/var.scss'
import './assets/scss/transition.scss'

import Button from '../packages/button'
import Checkbox from '../packages/checkbox'
import CheckboxGroup from '../packages/checkbox-group'
import Collapse from '../packages/collapse'
import CollapseItem from '../packages/collapse-item'
import Fields from '../packages/fields'
import Form from '../packages/form'
import FormItem from '../packages/form-item'
import Indicator from '../packages/indicator'
import Input from '../packages/input'
import List from '../packages/list'
import Loading from '../packages/loading'
import LoadMore from '../packages/load-more'
import Mask from '../packages/mask'
import MessageBox from '../packages/message-box'
import Modal from '../packages/modal'
import Picker from '../packages/picker'
import Popup from '../packages/popup'
import Progress from '../packages/progress'
import Radio from '../packages/radio'
import RadioGroup from '../packages/radio-group'
import Selector from '../packages/selector'
import Svg from '../packages/svg'
import Switch from '../packages/switch'
import Tab from '../packages/tab'
import TabContainer from '../packages/tab-container'
import TabContainerItem from '../packages/tab-container-item'
import Timeline from '../packages/timeline'
import TimelineItem from '../packages/timeline-item'
import Toast from '../packages/toast'


const components = [
    Button,
    Checkbox,
    CheckboxGroup,
    Collapse,
    CollapseItem,
    Indicator,
    Input,
    Form,
    FormItem,
    Fields,
    List,
    Loading,
    LoadMore,
    Mask,
    MessageBox,
    Modal,
    Picker,
    Popup,
    Progress,
    Radio,
    RadioGroup,
    Selector,
    Svg,
    Switch,
    Tab,
    TabContainer,
    TabContainerItem,
    Timeline,
    TimelineItem,
    Toast
]

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
    if (Vue.prototype) {
        Vue.prototype.$PL = {
            size: opts.size || '',
            zIndex: opts.size || 2000,
        }
    }
}

export default {
    version: '1.0.0',
    install,
    Button,
    Checkbox,
    CheckboxGroup,
    Collapse,
    CollapseItem,
    Indicator,
    Input,
    Form,
    FormItem,
    Fields,
    List,
    Loading,
    LoadMore,
    Mask,
    MessageBox,
    Modal,
    Picker,
    Popup,
    Progress,
    Radio,
    RadioGroup,
    Selector,
    Svg,
    Switch,
    Tab,
    TabContainer,
    TabContainerItem,
    Timeline,
    TimelineItem,
    Toast
}
