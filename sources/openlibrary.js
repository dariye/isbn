const fetch = require('node-fetch')

const OL_ROOT_API = 'https://openlibrary.org/api'
const OL_BOOKS_API = `${OL_ROOT_API}/books`
const titleURI = (isbn) =>`${OL_BOOKS_API}?bibkeys=ISBN:${isbn}&jscmd=data&format=json`

module.exports = async (isbn) => {
    response = await fetch(titleURI(isbn))
    return await response.json()
}
