import mongoose from 'mongoose'

export default async (dbUrl = process.env.MONGODB_URL) => {
  if(!dbUrl) {
    console.error('No db connection string provided')
    return
  }
  try {
    const db = await mongoose.connect(dbUrl)
    console.log(`Connected to db at ${dbUrl}`)
    return db
  } catch(err) {
    console.error('Error connecting to db')
    console.error(err)
  }
}
