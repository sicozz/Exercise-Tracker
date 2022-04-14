import mongodb from 'mongodb'
import dotenv from 'dotenv'
// Locals
import app from './server.js'
import ExerciseDAO from './dao/exerciseDAO.js'
dotenv.config()

const port = process.env.PORT || 8000
const MongoClient = mongodb.MongoClient

MongoClient.connect(
  process.env.DB_URI,
  {
    poolSize: 50,
    writeConcern: {
      wtimeout: 2500,
    },
    useUnifiedTopology: true
  }
)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .then(async client => {
    await ExerciseDAO.injectDB(client)
    var listener = app.listen(port, () => {
      console.log(`Listening on port: ${listener.address().port}`)
    })
  })
