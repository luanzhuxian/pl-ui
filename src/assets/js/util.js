// 节流阀
// fn是我们需要包装的事件回调, delay是时间间隔的阈值
export function throttle (fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0; let timer = null

    // 将throttle处理结果当作函数返回
    return function () {
    // 保留调用时的this上下文
        const context = this

        // 保留调用时传入的参数
        const args = arguments

        // 记录本次触发回调的时间
        const now = +new Date()

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer)
            timer = setTimeout(() => {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now
            fn.apply(context, args)
        }
    }
}

// 计算文本行数
export function getTextareaRows (el) {
    const lineHeight = Number.parseInt(getComputedStyle(el).lineHeight)
    const { scrollHeight } = el
    return Number.parseInt(scrollHeight / lineHeight)
}

export function isDef (value) {
    return value !== undefined && value !== null
}


export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    }
    return function (element, event, handler) {
        if (element && event && handler) {
            element.attachEvent(`on${ event }`, handler)
        }
    }
})()

export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    }
    return function (element, event, handler) {
        if (element && event) {
            element.detachEvent(`on${ event }`, handler)
        }
    }
})()

export const once = function (el, event, fn) {
    const listener = function () {
        if (fn) {
            fn.apply(this, arguments)
        }
        off(el, event, listener)
    }
    on(el, event, listener)
}