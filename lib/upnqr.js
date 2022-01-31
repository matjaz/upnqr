'use strict'

const {
  validSlog, validKodaNamena, validLength, validIBAN, required,
  formatAmount, formatBool, formatDate, parseAmount, parseBool, parseDate
} = require('./util')

class UPNQRError extends Error {
  constructor (msg) {
    super()
    this.name = 'UPNQRError'
    this.message = msg
  }
}

const items = [
  { name: 'slog', filterIn: [validSlog] },
  { name: 'IBAN_placnika', filterIn: [validIBAN] },
  { name: 'polog', filterIn: [parseBool], filterOut: [formatBool] },
  { name: 'dvig', filterIn: [parseBool], filterOut: [formatBool] },
  { name: 'referenca_placnika', filterIn: [validLength(26)] },
  { name: 'ime_placnika', filterIn: [validLength(33)] },
  { name: 'ulica_placnika', filterIn: [validLength(33)] },
  { name: 'kraj_placnika', filterIn: [validLength(33)] },
  { name: 'znesek', filterIn: [required, validLength(11), parseAmount], filterOut: [formatAmount] },
  { name: 'datum_placila', filterIn: [parseDate] },
  { name: 'nujno', filterIn: [parseBool], filterOut: [formatBool] },
  { name: 'koda_namena', filterIn: [validKodaNamena] },
  { name: 'namen_placila' },
  { name: 'rok_placila', filterIn: [parseDate], filterOut: [formatDate] },
  { name: 'IBAN_prejemnika', filterIn: [required, validIBAN] },
  { name: 'referenca_prejemnika' },
  { name: 'ime_prejemnika' },
  { name: 'ulica_prejemnika' },
  { name: 'kraj_prejemnika' },
  { name: 'vsota', filterIn: [required, parseFloat] },
  { name: 'rezerva' }
]

function encode (upn) {
  if (!('slog' in upn)) upn.slog = 'UPNQR'
  let sum = 0
  return items.map((item, i) => {
    if (item.name === 'vsota') return sum + 19
    let val = upn[item.name] || ''
    if (item.filterOut) val = applyFilters(val, item.filterOut, item.name)
    sum += val.length
    return val
  }).join('\n')
}

function decode (code) {
  if (code.length > 411) throw new UPNQRError('Code is too long')
  let sum = 0
  const upn = code.split('\n').slice(0, 21).reduce((agg, val, i) => {
    const item = items[i]
    if (i < 19) sum += val.length + 1
    if (item.filterIn) val = applyFilters(val, item.filterIn, item.name)
    if (val !== '') agg[item.name] = val
    return agg
  }, {})
  if (sum !== upn.vsota) throw new UPNQRError(`Invalid checksum. Expected ${upn.vsota}, got ${sum}`)
  return upn
}

function applyFilters (val, filters, name) {
  return filters.reduce((v, filter) => filter(v, name), val)
}

module.exports = {
  encode, decode, UPNQRError
}
