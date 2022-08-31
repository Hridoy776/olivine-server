const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(express.json());
app.use(cors())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.khhlpoo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){

    
    try{
        await client.connect()

        const foodCollection = client.db("olivine").collection("foods");
        // food api for get
        app.get('/foods', async (req,res)=>{
            const query={};
            const result = await foodCollection.find(query).toArray();
            res.send(result)
        })

    }finally{

    }
}
run().catch(console.dir)

console.log('db-connected')
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })