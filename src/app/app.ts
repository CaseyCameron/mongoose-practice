import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import heartbeat from './heartbeat'
import mongoose from 'mongoose'
import scalesRouter from './routes/scales'
import dotenv from 'dotenv'

dotenv.config()

const routePrefix = '/api/v1'

const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get(routePrefix, heartbeat)
app.use(routePrefix + '/scales', scalesRouter)
mongoose.set('strictQuery', true)

export default app
