const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const DatabaseConnect = require('./app/config/dbcon')
DatabaseConnect()

app.use(morgan('dev'))

const authRoute = require('./app/routes/authRoute')
app.use(authRoute)

const productRoute = require('./app/routes/productRoute')
app.use('/api/v1',productRoute)

const port = 3006

app.listen(port, ()=>{
  console.log(`server running on http://localhost:${port}`)
})