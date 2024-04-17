
const express = require('express')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3003;

//Avilable Routes\

app.use(cors());
app.use(express.json());

app.use("/api/notes", require('./routes/notes'))
app.use("/api/getheader", require('./routes/getHeader'))

app.get('/', (req, res) => {
  res.send('Hello Naman')
})

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`)
})

