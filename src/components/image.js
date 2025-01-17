/**
 * resize: => v-weex-resize directive
 * NOTE: both static and binding values are valid.
 */
exports.processResize = function (
  el,
  attrs
) {
  const tag = el._origTag || el.tag
  if (
    this.config.preservedTags.indexOf(tag) > -1
    && (tag !== 'image' && tag !== 'gif')
  ) {
    return
  }
  const resizeObj = attrs.filter(function (attr) {
    return attr.name === 'resize'
  })[0]
  if (resizeObj) {
    let directives = el.directives
    if (!directives) {
      directives = el.directives = []
    }
    directives.push({
      name: 'weex-resize',
      rawName: 'v-weex-resize',
      value: resizeObj.value,
      arg: null,
      modifiers: undefined
    })
  }
}

exports.processImage = function (
  el,
  attrsMap,
  attrsList,
  attrs,
  staticClass
) {
  // src => data-img-src. both binding and static.
  for (let i = 0, l = attrs.length; i < l; i++) {
    const { name, value } = attrs[i]
    if (name === 'src') {
      attrs.push({
        name: 'data-img-src',
        value
      })
       if (this.config.disablelazy) {
        if (el.styleBinding && !el.styleBinding.indexOf('backgroundImage')) el.styleBinding.replace(/}/, ", backgroundImage: 'url('+"+value+"+')'}")
        else el.styleBinding = "{ backgroundImage: 'url('+"+value+"+')'}"
      }
    }
  }
  const finalClass = staticClass + ' weex-el weex-image'
  el.staticClass = `"${finalClass}"`
  attrs.push({
    name: `weex-type`,
    value: `"${el._origTag || el.tag || 'image'}"`
  })
  delete el.ns
  el.plain = false
}
