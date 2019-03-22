
// http://www.regular-expressions.info/email.html
export const PATTERN_EMAIL = /\b[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(?:\.[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\b/

// https://gist.github.com/dperini/729294
export const PATTERN_URL = /\b(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\b/i

// +86-10-87654321
// 010-87654321
// 13612345678
// 有时长途还有加拨 17951 之类的，所以手机号码会达到 16 位
export const PATTERN_TEL = /\b(\+\d{2,5}\-)?(\d{2,4}\-)?\d{6,16}\b/

export function isEmail(str) {
  return PATTERN_EMAIL.test(str)
}

export function isUrl(str) {
  return PATTERN_URL.test(str)
}

export function isTel(str) {
  return PATTERN_TEL.test(str)
}

export function parse(str, pattern, title) {
  let result = []
  let index = 0
  let match
  while (match = pattern.exec(str)) {
    result.push({
      text: str.substr(0, match.index)
    })
    result.push({
      link: match[0],
      text: title || match[0],
    })
    index = match.index + match[0].length
    str = str.substr(index)
  }
  if (str.length) {
    result.push({
      text: str
    })
  }
  return result
}

export function parseAll(text) {

  let result = [ ]

  parse(text, PATTERN_EMAIL).forEach(item => {
    if (item.link) {
      item.type = 'email'
      result.push(item)
    }
    else {
      parse(item.text, PATTERN_URL).forEach(item => {
        if (item.link) {
          item.type = 'url'
          result.push(item)
        }
        else {
          parse(item.text, PATTERN_TEL).forEach(item => {
            if (item.link) {
              item.type = 'tel'
              result.push(item)
            }
            else {
              item.type = 'text'
              result.push(item)
            }
          })
        }
      })
    }
  })

  return result

}
