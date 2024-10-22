const express =require('express');
const mongoose=require('mongoose');
const cors =require('cors');
require('dotenv').config();

const app =express();
app.use(cors());
app.use(express.json());

const URI =process.env.MONGODB_URI;

const PORT = process.env.PORT || 5000;

console.log('Starting server...');


mongoose.connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
  });

  const Contact =mongoose.model('Contact',contactSchema);
  app.post('/api/contact',async(req,res)=>{
    const {name,email,subject,message} =req.body;
    const newContact =new Contact({name,email,subject,message});
    try{
        await newContact.save();
        res.status(201).send('Message recieved');
    }catch(error){
        console.error('Error saving message:', error);
        res.status(400).send("Error saving message");
    }
  });

  app.get('/',async(req,res)=>{
    try{ 
      res.status(200).send("Server running");
    }catch(error){
      console.error('Error in root route:', error);
      res.status(500).send("Error :",error);
    }
  });


