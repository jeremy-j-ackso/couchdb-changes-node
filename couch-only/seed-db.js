const nano = require('nano')('http://admin:password@localhost:5984')
const async = require('async');

const possibleIds = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

let presentIds = [];
let dbToWatch;

async.series([
  (callback) => {
    console.log('Checking if the watch_these_changes database exists.');
    nano.db.list((err, body) => {
      if (err) console.log(err);
      if (body.includes('watch_these_changes')) {
        console.log('watch_these_changes was found.\nUsing it.');
        dbToWatch = nano.use('watch_these_changes');
        return callback();
      }
      console.log('watch_these_changes was not found.\nCreating it.');
      nano.db.create('watch_these_changes', (err) => {
        if (err) console.log(err);
        console.log('watch_these_changes was created.\nUsing it.')
        dbToWatch = nano.use('watch_these_changes');
        return callback();
      })
    });
  },
  (callback) => {
    dbToWatch.list((err, body) => {
      if (err) {
        console.log('There appears to be no documents in the database.');
        return callback();
      }
      console.log('grabbing present ids');
      presentIds = body.rows.map(doc => doc.id);
      return callback();
    })
  },
  (callback) => {
    console.log('Checking ids for insert.');
    possibleIds.forEach((id) => {
      if (!presentIds.includes(id)) {
        console.log(`${id} was not found; adding it.`);
        dbToWatch.insert({ _id: id, updatedData: [{ ts: new Date(), val: 1 }] }, (err, body) => {
          if (err) console.log(err);
          console.log(`Inserted initial data.\n${JSON.stringify(body)}`);
        });
      } else {
        console.log(`id ${id} was found; going to next.`);
      }
    })
    return callback();
  },
])
