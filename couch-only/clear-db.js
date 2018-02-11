const nano = require('nano')('http://admin:password@localhost:5984')

nano.db.destroy('watch_these_changes', (err, body) => {
  if (err) console.log(err)
  console.log(`watch_these_changes was destroyed with message:\n${JSON.stringify(body)}`)
  console.log('Creating a new, empty instance of watch_these_changes.')
  nano.db.create('watch_these_changes', (err, body) => {
    if (err) console.log(err)
    console.log(`watch_these_changes was created with message: \n${JSON.stringify(body)}`)
  })
})
