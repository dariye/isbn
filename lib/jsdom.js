const {JSDOM} = require('jsdom')

const getDOM = (html) => new JSDOM(html, { referrer: 'https://google.com', includeNodeLocations: true })

module.exports = getDOM