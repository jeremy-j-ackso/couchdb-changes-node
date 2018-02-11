const nano = require('nano')('http://localhost:5984')
const Sequelize = require('sequelize')

const sqlDbToUpdate = new Sequelize('postgres://node_user@localhost:5432/updatedDb')

const dbToWatch = nano.use('watch_these_changes')

let feed = nano.db.follow('watch_these_changes', { since: 'now' })

feed.on('change', (change) => {
  dbToWatch.get(change.id, (err, body) => {
    // Should check to see what's in the sql database for this document and insert
    // any new records.
    //
    // Currently having a problem with Postgres:
    // SequelizeConnectionError: no pg_hba.conf entry for host '10.0.2.2",
    // user "node_user", database "updatedDb", SSL off
  })
})
