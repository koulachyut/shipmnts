const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.post("",async(req,res)=>{

})


app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
