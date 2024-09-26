const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()
const uri = process.env.ATLAS_URI
const client = new MongoClient(uri)
const PORT = process.env.PORT || 3222
let connectedClient, db 
async function connectToMongoDB(){
    try {
        connectedClient = await client.connect()
        console.log('Server connected to MongoDB!')
    } catch(err) {
        console.log(err)
    } finally {
        db = connectedClient.db('elmarwinelist-main-db-0cc35737ece')
        app.listen(PORT, ()=>{
            console.log(`Server is now listening on port: ${PORT}`)
        })
    }
}
connectToMongoDB()
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req, res)=>{
    db.collection('winelist').find().toArray()
    .then(data=>{
        res.render('index.ejs',{info:data})
    })
})
