import express from 'express'
import Connection from './db/database.js'
import Router from './routes/route.js'
import bodyParser from 'body-parser';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Convert the current module's URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = dirname(__filename);


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