import Vue from 'vue'
import MessageBox from './Message-Box.vue'

/**
 * 消息盒子弹框
 * 种类：
 * confirm - 确定框，带有取消和确定两个按钮 用法: vm.$confirm(config)
 * alert - 提示框，仅作为提示弹框 用法: vm.$alert(config)
 * propmt - 带有输入框的弹框 用法: vm.$propmt(config)
 * config - [Object, String] 如果传入string, string将作为message展示
 */
const MessageBoxCtor = Vue.extend(MessageBox)

const confirm = (config = {}) => new Promise((resolve, reject) => {
    if (typeof config === 'string') {
        config = { message: config }
    }
    const Instance = new MessageBoxCtor({
        el: document.createElement('div') // 组件 dom 挂载点
    })
    document.body.appendChild(Instance.$el)

    const {
        slot = null,
        cancelText = '取消',
        confirmText = '确定',
        viceMessage = '',
        html = '',
        message = '',
        icon,
        closeOnClickMask = true,
        confirmStyle,
        cancelStyle,
        useDangersHtml = false,
        hasCancelButton = true,
        hasConfirmButton = true
    } = config
    if (slot) {
        Instance.$slots.default = [slot]
    }
    Instance.$nextTick(() => {
        Instance.html = html
        Instance.message = message
        Instance.useDangersHtml = useDangersHtml
        Instance.viceMessage = viceMessage
        Instance.cancelText = cancelText
        Instance.confirmText = confirmText
        Instance.confirmStyle = confirmStyle
        Instance.cancelStyle = cancelStyle
        Instance.icon = icon
        Instance.hasCancelButton = hasCancelButton
        Instance.hasConfirmButton = hasConfirmButton
        Instance.type = 'confirm'
        Instance.show = true
        Instance.closeOnClickMask = closeOnClickMask
        Instance.$on('cancel', () => {
            reject(false)
        })
        Instance.$on('confirm', () => {
            resolve()
        })
    })
})

const alert = (config = {}) => new Promise((resolve, reject) => {
    if (typeof config === 'string') {
        config = { message: config }
    }
    const Instance = new MessageBoxCtor({
        el: document.createElement('div')
    })
    document.body.appendChild(Instance.$el)
    const {
        slot = null,
        cancelText = '取消',
        confirmText = '确定',
        viceMessage = '',
        message = '',
        icon,
        confirmStyle,
        cancelStyle,
        useDangersHtml = false,
        hasCancelButton = false,
        hasConfirmButton = true
    } = config
    if (slot) {
        Instance.$slots.default = [slot]
    }
    Instance.$nextTick(() => {
        Instance.message = message
        Instance.useDangersHtml = useDangersHtml
        Instance.viceMessage = viceMessage
        Instance.cancelText = cancelText
        Instance.confirmText = confirmText
        Instance.confirmStyle = confirmStyle
        Instance.cancelStyle = cancelStyle
        Instance.hasCancelButton = hasCancelButton
        Instance.hasConfirmButton = hasConfirmButton
        Instance.type = 'alert'
        Instance.icon = icon
        Instance.show = true
        Instance.$on('cancel', () => {
            reject(false)
        })
        Instance.$on('confirm', () => {
            resolve()
        })
    })
})

const propmt = (config = {}) => new Promise((resolve, reject) => {
    if (typeof config === 'string') {
        config = { message: config }
    }
    const Instance = new MessageBoxCtor({
        el: document.createElement('div')
    })
    document.body.appendChild(Instance.$el)
    const {
        slot = null,
        cancelText = '取消',
        confirmText = '确定',
        viceMessage = '',
        message = '',
        icon = '',
        placeholder = '请输入',
        rules = [],
        value = '',
        useDangersHtml = false,
        hasCancelButton = true,
        hasConfirmButton = true,
        hasDefaultInput = true,
        closeOnClickMask = true,
        customValidate = () => true
    } = config
    if (slot) {
        Instance.$slots.default = [slot]
    }
    Instance.$nextTick(() => {
        Instance.message = message
        Instance.useDangersHtml = useDangersHtml
        Instance.viceMessage = viceMessage
        Instance.placeholder = placeholder
        Instance.propmtValue = value
        Instance.rules = rules
        Instance.cancelText = cancelText
        Instance.confirmText = confirmText
        Instance.hasCancelButton = hasCancelButton
        Instance.hasConfirmButton = hasConfirmButton
        Instance.hasDefaultInput = hasDefaultInput
        Instance.closeOnClickMask = closeOnClickMask
        Instance.customValidate = customValidate
        Instance.type = 'propmt'
        Instance.icon = icon
        Instance.show = true
        Instance.$on('cancel', () => {
            reject(false)
        })
        Instance.$on('confirm', val => {
            resolve(val)
        })
    })
})

export default {
    confirm,
    alert,
    propmt
}
