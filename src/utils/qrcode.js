import Vue from 'vue'
import qrcode from 'qrcode'

/**
 * Is an empty object
 * @param {obj} obj
 * @param {number} type
 * @returns {string}
 */
Vue.prototype.$fQrcodeUrl = (obj, type = 1) => {
  let text = obj.companyRiskAreaId || ''
  const option = {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 256,
    height: 256
  }
  if (type === 1) {
    text = 'a' + obj.companyId || ''
    let color = '#ff0000'
    if (obj.safeQrCodeColorRed === 1) {
      color = '#ff0000'
    } else {
      if (obj.safeQrCodeColor === 1) {
        color = '#CCCCCC'
      } else if (obj.safeQrCodeColor === 2) {
        color = '#ff0000'
      } else if (obj.safeQrCodeColor === 3) {
        color = '#ff9900'
      } else if (obj.safeQrCodeColor === 4) {
        color = '#ffff00'
      } else if (obj.safeQrCodeColor === 5) {
        color = '#66ccff'
      } else {
        color = '#CCCCCC'
      }
    }
    option.color = {
      dark: color
    }
  }
  return qrcode.toDataURL(text, option)
}

// this.$fQrcodeUrl(res.data).then(url => {
//   res.data.qrcodeUrl = url
// })