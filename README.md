# UPN QR

[![NPM][npm-image]][npm-url]

Encode and decode [UPN QR](https://upn-qr.si/).

## Installation
```zsh
$ npm i upnqr --save
```

## Encode QR code data

```js
const { encode } = require('upnqr')
const result = encode({
  slog: 'UPNQR',
  polog: false,
  dvig: false,
  ime_placnika: 'Janez Novak',
  ulica_placnika: 'Lepa cesta 10',
  kraj_placnika: '2000 Maribor',
  znesek: 14.712,
  nujno: true,
  koda_namena: 'SCVE',
  namen_placila: 'Ravn. z odpadki 04/2016 0040098579',
  rok_placila: new Date(),
  IBAN_prejemnika: 'SI56051008010486080',
  referenca_prejemnika: 'SI121033842574531',
  ime_prejemnika: 'Snaga d.o.o.',
  ulica_prejemnika: 'Povšetova ulica 6',
  kraj_prejemnika: '1000 Ljubljana',
  rezerva: 'dodatek do skupaj 411 znakov'
})
console.log(result)
```

## Decode QR code data

```js
const { decode } = require('upnqr')
const upn = decode(QR_code_string) // returns similar object as passed in encode above
console.log(upn)
console.log(upn.rok_placila.toJSON())
```

## License
ISC

[npm-image]: https://img.shields.io/npm/v/upnqr.svg
[npm-url]: https://www.npmjs.com/package/upnqr
