import express from 'express'
import Connection from './db/database.js'
import Router from './routes/route.js'

const app = express()

app.use('/', Router)



const port = 4000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

Connection();