export const fnBrowserDetect = (userAgent: string) => {
    if (userAgent.match(/chrome|chromium|crios/i)) {
        if (userAgent.match(/yabrowser/i)) return 'Yandex'
        if (userAgent.match(/edg/i)) return 'Edg'
        if (userAgent.match(/opr\//i)) return 'Opera'
        return 'Chrome'
    }
    if (userAgent.match(/firefox|fxios/i)) return 'Firefox'
    if (userAgent.match(/safari/i)) return 'Safari'
    return 'chrome'
}
