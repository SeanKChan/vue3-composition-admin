/**
 * 生成 UUID
 */
export function uuid() {
  const tmpUrl = URL.createObjectURL(new Blob())
  const uuid = tmpUrl.toString()
  // 释放这个url
  URL.revokeObjectURL(tmpUrl)
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}

/**
 * 金额格式化
 * @param number 要格式化的数据
 * @param decimals 保留几位小叔
 * @param decPoint 小数点符号
 * @param thousandsSep 千分位符号
 */
export const moneyFormat = (number: any, decimals: number, decPoint: string, thousandsSep: string) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  const toFixedFix = function (n: number, prec: any) {
    const k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }
  const s: string[] = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}
