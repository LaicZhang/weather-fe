/**
 * 工具函数封装
 */
export default {
  formateDate(date: any, rule: string): string {
    let fmt: string = rule || 'yyyy-MM-dd hh:mm:ss'
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, date.getFullYear())

    const o: any = {
      // 'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = `${o[k]}`
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? val : (`00${val}`).substr(val.length))
      }
    }
    return fmt
  },
  generateRoute(menuList: any) {
    const routes: any[] = []
    interface ListItem{
      name?: string
      path?: string
      component?: string
      children?: any
      meta?: any
    }
    const deepList = (list: any[]) => {
      while (list.length) {
        const item = list.pop()
        if (item.action) {
          const temp: ListItem = {
            name: item.component,
            path: item.path,
            meta: {
              title: item.menuName,
            },
            component: item.component,
          }
          routes.push(temp)
        }
        if (item.children && !item.action)
          deepList(item.children)
      }
    }
    deepList(menuList)
    return routes
  },
}
