const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7rbiakh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const serviceCollection = client.db('creative-agency').collection('services');
        const orderCollection = client.db('creative-agency').collection('order')
        const reviewCollection = client.db('creative-agency').collection('review');


          // service api
          app.get('/service', async(req, res)=>{
            const query = {};
            const cursor  = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        // Review API
        app.get('/order', async(req, res)=>{
            const query = {};
            const cursor  = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        })
        // review  Post method api
        app.post('/order', async(req, res)=>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        // Review API
        app.get('/review', async(req, res)=>{
            const query = {};
            const cursor  = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        })
        // review  Post method api
        app.post('/review', async(req, res)=>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });



    }

    finally {

    }
}
run().catch(console.dir);


// root
app.get('/', (req, res)=>{
    res.send('agency server is running')
});

// root listen
app.listen(port, ()=>{
    console.log('agency Server is running on port', port);
})