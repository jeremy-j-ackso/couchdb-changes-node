const nano = require('nano')('http://localhost:5984')
const Sequelize = require('sequelize')
const async = require('async')

// Need to update so that it uses the Symbol based operators.
const sqlDbToUpdate = new Sequelize('postgres://node_user@localhost:5432/updatedDb')

// Need to add model for `users` pg table.
// Need to add model for `updatedData` pg table.

const dbToWatch = nano.use('watch_these_changes')

let feed = nano.db.follow('watch_these_changes', { since: 'now' })

feed.on('change', (change) => {
  async.waterfall([
    (callback) => {
      dbToWatch.get(change.id, (err, body) => {
        // Gets the current doc associated with the change.
        // Pass doc to callback.
      })
    },
    (callback, doc) => {
      // Check if the _id is present in pg `users`.
      // If not present, insert into pg `users`.
      // Pass doc to callback.
    },
    (callback, doc) => {
      // Grab the most recent value from pg `updatedData`.
      // Insert any observations that are not present.
      // Pass nothing to callback.
    }
  ])
})

feed.follow()
