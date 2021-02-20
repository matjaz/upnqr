'use strict'

function required (str, fieldName) {
  if (str.trim().length === 0) error(`${fieldName} is required`)
  return str
}

function validSlog (str) {
  if (str !== 'UPNQR') error('Invalid code')
  return str
}

function validIBAN (str) {
  if (str.length > 19) error('Invalid IBAN')
  return str
}

const kodaNamenaRE = /^[A-Z]{4}$/
function validKodaNamena (str, fieldName) {
  if (!kodaNamenaRE.test(str)) error(`Invalid ${fieldName}`)
  return str
}

function parseDate (str) {
  if (!str) return str
  if (str.length !== 10) error(`Invalid date length ${str}`)
  const parts = str.split('.')
  if (parts.length !== 3) error('Invalid date format')
  const d = new Date()
  d.setTime(0)
  d.setDate(num(parts[0]))
  d.setMonth(num(parts[1]) - 1)
  d.setFullYear(num(parts[2]))
  return d
}

function parseBool (str, fieldName) {
  if (str !== '' && str !== 'X') error(`Invalid bool "${str}" for ${fieldName}`)
  return str === 'X'
}

function parseAmount (str) {
  const n = num(str)
  if (Number.isNaN(n)) error(`Invalid amount ${str}`)
  return n / 100
}

function formatDate (date) {
  if (!(date instanceof Date)) error('Invalid date object')
  return `${pad(date.getDate() + '')}.${pad(date.getMonth() + 1 + '')}.${date.getFullYear()}`
}

function formatBool (bool) {
  return bool ? 'X' : ''
}

function formatAmount (amount) {
  return pad(Math.floor(amount * 100).toString(), 11)
}

const validLength = memoize(function (length) {
  return function (str, fieldName) {
    if (str.length > length) error(`Invalid length. ${fieldName} max len is ${length}, got ${str.length}`)
    return str
  }
})

function error (msg) {
  throw new (require('./upnqr').UPNQRError)(msg)
}

function num (str) {
  return parseInt(str, 10)
}

function pad (str, n = 2) {
  while (str.length < n) str = '0' + str
  return str
}

function memoize (fn) {
  return function () {
    let hash = ''
    let i = arguments.length
    while (i--) {
      const currentArg = arguments[i]
      hash += currentArg === Object(currentArg) ? JSON.stringify(currentArg) : currentArg
    }
    if (!fn.memoize) fn.memoize = {}
    return hash in fn.memoize ? fn.memoize[hash] : (fn.memoize[hash] = fn.apply(this, arguments))
  }
}

module.exports = {
  required,
  validSlog,
  validIBAN,
  validLength,
  validKodaNamena,
  parseDate,
  parseBool,
  parseAmount,
  formatDate,
  formatBool,
  formatAmount
}
