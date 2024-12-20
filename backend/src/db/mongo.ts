import { MongoClient as Mongo, Db } from "mongodb"

export const MongoClient = {

    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const url = process.env.DB_HOST
        const username = process.env.DB_USER
        const password = process.env.DB_PASSWORD

        const client = new Mongo(url, { auth: { username, password } })
        const db = client.db("taxi")

        this.client = client
        this.db = db
    }
}