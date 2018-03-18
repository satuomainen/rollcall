const db = require('../db')



 db.didSync
   .then(() => db.sync({force: true}))
   .catch(error => console.error(error))
   .finally(() => db.close())
