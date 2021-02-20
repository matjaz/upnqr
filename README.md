# UPN QR

[![NPM][npm-image]][npm-url]

Encode and decode [UPN QR](https://upn-qr.si/).

## Encode QR code data

```js
const encode = require('upnqr').encode
const result = encode({
  "polog": false,
  "dvig": false,
  "ime_placnika": "Janez Novak",
  "ulica_placnika": "Lepa cesta 10",
  "kraj_placnika": "2000 Maribor",
  "znesek": 14.71,
  "nujno": false,
  "koda_namena": "SCVE",
  "namen_placila": "Ravn. z odpadki 04/2016 0040098579",
  "rok_placila": "2016-06-24T23:00:00.000Z",
  "IBAN_prejemnika": "SI56051008010486080",
  "referenca_prejemnika": "SI121033842574531",
  "ime_prejemnika": "Snaga d.o.o.",
  "ulica_prejemnika": "Povšetova ulica 6",
  "kraj_prejemnika": "1000 Ljubljana",
})
console.log(result)
```

## Decode QR code data

```js
const decode = require('upnqr').decode

var upn = decode(QR_code_string) // returns similar object as passed in encode above
console.log(upn) 
console.log(upn.rok_placila.toJSON())
```

## License
ISC

[npm-image]: https://img.shields.io/npm/v/upnqr.svg
[npm-url]: https://www.npmjs.com/package/upnqr
