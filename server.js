if(process.env.NODE_ENV !== 'production'){

    dotenv = require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const routerIndex = require('./routes/index')

//configuro el servidor
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')

//creo los objetos
app.use(expressLayout)
app.use(express.static('public')) //aca se guardaran todo que sea publico, script, html, etc

//creo la conexion a la base de datos
const mongoose = require('mongoose')
//mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection

db.on('error', erro => console.error(error))
db.once('open', erro => console.log('Conectado a la base de datos'))


app.use('/',routerIndex)

//escucha por el puerto del servidor o por el puerto 3000
app.listen(process.env.PORT || 3000)

