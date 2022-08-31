const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
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
        const orderCollection = client.db("olivine").collection("order");
        // food api for get
        app.get('/foods', async (req,res)=>{
            const query={};
            const result = await foodCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/order', async (req,res)=>{
            const query={};
            const result = await orderCollection.find(query).toArray();
            res.send(result)
        })

        // post api for order

        app.post("/order/:id", async (req,res)=>{
            const id=req.params.id;
            const query = {_id: ObjectId(id)}
            const orderFood= await foodCollection.findOne(query);
            const order= await orderCollection.insertOne(orderFood);

            res.send({data:order,status:"success"});

        })
        // order delete api 
        app.delete('/order/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)};
            const result= await orderCollection.deleteOne(query);
            res.send(result);
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