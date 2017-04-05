const mongoose = require('mongoose')
const addDeleteToPosts = require('./addDeleteToPosts')

const start = async () => {
  try {
    mongoose.Promise = Promise
    await mongoose.connect(process.env.MONGODB, { promiseLibrary: Promise })
  } catch (error) {
    console.log('failed to connect to mongoose')
  }

  await addDeleteToPosts.start()
}

try {
  start()
    .then(() => console.log('migration was successful'))
} catch (error) {
  console.log('failed to migrate: ', error)
}
