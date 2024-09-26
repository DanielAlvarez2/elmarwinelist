const express = require('express')
const app = express()
const PORT = process.env.PORT || 3222
app.use(express.static('public'))

app.get('/',(req, res)=>{
    res.sendFile(index.html)
})
app.listen(PORT,()=>{
    console.log(`Express Server Now Listening on port ${PORT}`);
})