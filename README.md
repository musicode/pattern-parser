# pattern-parser

解析常用正则

```js

import * as patternParser from 'pattern-parser'

patternParser.isEmail(str)
patternParser.isUrl(str)
patternParser.isTel(str)

patternParser.parse(str, pattern, title)

patternParser.parseAll(str)

```