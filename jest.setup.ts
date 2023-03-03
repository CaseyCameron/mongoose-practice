import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import connectToDb from './src/db/connect-to-db'

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  return connectToDb(uri)
})

afterEach(() => {
  return mongoose.connection.dropDatabase()
})

afterAll(async () => {
  await mongoose.connection.close()
  return mongo.stop()
})
