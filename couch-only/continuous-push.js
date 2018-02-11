const dbToWatch = require('nano')('http://localhost:5984/watch_these_changes');
const async = require('async');

const possibleIds = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

async.forever((next) => {
  async.waterfall([
    (callback) => {
      const idx = Math.floor(Math.random() * 10)
      const curId = possibleIds[idx]
      dbToWatch.get(curId, (err, body) => {
        if (err) console.log(err)
        callback(null, body)
      })
    },
    (doc, callback) => {
      doc.updatedData.push({ ts: new Date(), val: 1 })
      dbToWatch.insert(doc, (err) => {
        if (err) console.log(err)
        console.log(`Inserted ${JSON.stringify(doc)}.`)
        callback()
      })
    },
  ])
  setTimeout(() => next(), 1000);
})
