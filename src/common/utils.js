// 工具类
import * as Vibrant from 'node-vibrant'

let utils = {
  /**
   * 获取图片颜色属性
   * @param ImageSource  图片路径
   * @param swatchType :
    *        Vibrant: 活力色调
             Muted: 柔和的色调
             DarkVibrant: 活力的暗色调
             DarkMuted: 柔和的暗色调
             LightVibrant: 活力的亮色调
             LightMuted: 柔和的亮色调
   */
  getImagePalette: (ImageSource, swatchType = 'DarkMuted') => {
    let vibrant = new Vibrant(ImageSource)
    return vibrant.getPalette().then((palette) => {
      return new Promise((resolve, reject) => {
        if (palette[swatchType]) {
          resolve(palette[swatchType])
        } else {
          reject(new Error('palette.swatchType is not defined'))
        }
      })
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

export default utils
