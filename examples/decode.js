const { decode } = require('upnqr')
const code = 'UPNQR\n\n\n\n\nJanez Novak\nLepa cesta 10\n2000 Maribor\n00000001471\n\n\nSCVE\nRavn. z odpadki 04/2016 0040098579\n25.06.2016\nSI56051008010486080\nSI121033842574531\nSnaga d.o.o.\nPovšetova ulica 6\n1000 Ljubljana\n198\ndodatek do skupaj 411 znakov'
const upn = decode(code)
console.log(upn)
