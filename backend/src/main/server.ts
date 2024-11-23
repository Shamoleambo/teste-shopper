import express, { NextFunction, Request, Response } from "express"
import { json } from "express"
import router from './routes'
import { MongoClient } from "../db/mongo"


MongoClient.connect().then(() => {
    console.log('Connected to Mongo Database')

    const app = express()

    app.use(json())
    app.use((req: Request, res: Response, next: NextFunction): void => {
        res.set('access-control-allow-origin', '*')
        res.set('access-control-allow-headers', '*')
        res.set('access-control-allow-methods', '*')
        next()
    })

    app.use(router)

    app.listen(8080, () => console.log('Server running at http://localhost:8080'))
}).catch(() => {
    console.log('Failed to connect to the database')
})
