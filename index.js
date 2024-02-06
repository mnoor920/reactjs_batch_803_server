import express from 'express'
import Connection from './db/database.js'
import Router from './routes/route.js'
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express()
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Router)



const port = 4000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

Connection();