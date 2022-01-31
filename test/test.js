const { encode, decode } = require('../lib/upnqr')
const assert = require('assert')
const { describe, it } = require('mocha')

const upn = `UPNQR




JANEZ NOVAK
Ljubljanska cesta 1
1000 MARIBOR
00000008588


COST
Plač. razdelilnika št. 9990029934988
20.02.2021
SI56029220020148350
SI129990029934988
SPL d.d.
Frankopanska ul. 18a
1000 LJUBLJANA
205
rezerva
`

describe('Test encoding and decoding', () => {
  it('encoded value and original UPN code should be identical', () => {
    const decoded = decode(upn)
    delete decoded.slog
    const encoded = encode(decoded)
    assert.strictEqual(encoded, upn.trim())
  })
})
