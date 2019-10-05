const { send } = require('micro')
const retry = require('p-retry')
const Route = require('route-parser')
const sources = require('./sources')

const find = async (isbn) => {
  let data = {}

  for (let source in sources) {
    data = await sources[source](isbn)
    if (Object.keys(data).length > 0) {
      break;
    }
  }
  return data
}

const main = async (req, res) => {
  const { url } = req
  const route = new Route('/find/:isbn')
  const { isbn } = route.match(url)
  try {
    if (isbn) {
      const data = await retry(() => find(isbn), {
        onFailedAttempt: error => {
          console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
        },
        retries: 5
      })
      if (Object.keys(data).length > 0) {
        send(res, 200, data)
      } else {
        send(res, 204)
      }
    } else {
     send(res, 404)
    }
  } catch (e) {
    console.log(e)
    send(res, 500)
  }
}

module.exports = main

