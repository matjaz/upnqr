const encode = require('upnqr').encode

const upn = {
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
}

const code = encode(upn)

console.log(code)
