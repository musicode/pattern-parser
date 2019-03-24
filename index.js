"use strict";
exports.__esModule = true;
// http://www.regular-expressions.info/email.html
exports.PATTERN_EMAIL = /\b[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(?:\.[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\b/;
// https://gist.github.com/dperini/729294
exports.PATTERN_URL = /\b(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\b/i;
// +86-10-87654321
// 010-87654321
// 13612345678
// 有时长途还有加拨 17951 之类的，所以手机号码会达到 16 位
exports.PATTERN_TEL = /\b(\+\d{2,5}\-)?(\d{2,4}\-)?\d{6,16}\b/;
function isEmail(str) {
    return exports.PATTERN_EMAIL.test(str);
}
exports.isEmail = isEmail;
function isUrl(str) {
    return exports.PATTERN_URL.test(str);
}
exports.isUrl = isUrl;
function isTel(str) {
    return exports.PATTERN_TEL.test(str);
}
exports.isTel = isTel;
var Token = /** @class */ (function () {
    function Token(text, link, type) {
        this.text = text;
        this.link = link;
        this.type = type;
    }
    return Token;
}());
function parse(str, pattern, title) {
    var result = [];
    var index = 0;
    var match;
    while (match = pattern.exec(str)) {
        result.push(new Token(str.substr(0, match.index)), new Token(title || match[0], match[0]));
        index = match.index + match[0].length;
        str = str.substr(index);
    }
    if (str.length) {
        result.push(new Token(str));
    }
    return result;
}
exports.parse = parse;
function parseAll(text) {
    var result = [];
    parse(text, exports.PATTERN_EMAIL).forEach(function (token) {
        if (token.link) {
            token.type = 'email';
            result.push(token);
        }
        else {
            parse(token.text, exports.PATTERN_URL).forEach(function (token) {
                if (token.link) {
                    token.type = 'url';
                    result.push(token);
                }
                else {
                    parse(token.text, exports.PATTERN_TEL).forEach(function (token) {
                        if (token.link) {
                            token.type = 'tel';
                            result.push(token);
                        }
                        else {
                            token.type = 'text';
                            result.push(token);
                        }
                    });
                }
            });
        }
    });
    return result;
}
exports.parseAll = parseAll;
