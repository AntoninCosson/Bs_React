const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING; 

mongoose.connect(connectionString, {
    connectTimeoutMS: 2000,
    dbName: 'BsReact',
  })
 .then(() => console.log('Database connected'))
 .catch(error => console.error(error));