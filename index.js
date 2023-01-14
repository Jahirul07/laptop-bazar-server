const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rebcmop.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try{
    const productCategoryCollection = client.db('laptopBazar').collection('categories');
    const productCollection = client.db('laptopBazar').collection('products');
    const Booking = client.db('laptopBazar').collection('booking')

    app.get('/category', async(req, res) => {
      const query = {};
      const option = await productCategoryCollection.find(query).toArray();
      res.send(option);
    })

    app.get('/category/:name', async(req, res) => {
      const name = req.params.name;
      const query = {category: name}
      const selectCategory = await productCollection.find(query).toArray();
      res.send(selectCategory);
    })

    app.post('/booking', async(req, res) =>{
      const result = await Booking.insertOne(req.body);
      res.send(result);
  })

  }
  finally{

  }
}
run().catch(err => console.log(err))




app.get('/', async(req, res) => {
    res.send('laptop bazar server is running');
})

app.listen(port, () => console.log(`Laptop bazar running on ${port}`))