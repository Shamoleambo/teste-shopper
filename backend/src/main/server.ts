import express, { json } from "express"
import cors from 'cors'
import router from './routes'
import { MongoClient } from "../db/mongo"


MongoClient.connect().then(() => {
    console.log('Connected to Mongo Database')

    const app = express()

    app.use(cors())
    app.use(json())

    app.use(router)

    app.listen(8080, () => console.log('Server running at http://localhost:8080'))
}).catch(() => {
    console.log('Failed to connect to the database')
})
