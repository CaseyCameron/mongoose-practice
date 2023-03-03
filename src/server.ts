import app from './app/app'
import dotenv from 'dotenv'
import connectToDb from './db/connect-to-db'

dotenv.config()

connectToDb()

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
