const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(' Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const store = new mongoose.Schema({
    store_location:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    tax_percentage:{
        type:Number
    },
    premium_items:[]   
});
const Store= mongoose.model("Store",store);

const plan= new mongoose.Schema({
    valid_from:{
     type:Number
    },
    valid_to:{
        type:Number
    },
  store_location:{
     type:String,
        required:true
  },
  
  items: [
    {
      category: String,
      name: String,
      half_price:Number,
      full_price:Number,
      extra_charge:Number
    }
  ]
})
const Plan= mongoose.model("Plan",plan);


app.post("/store",async(req,res)=>{
   const{store_location,currency,tax_percentage,premium_items}= req.body;
   //console.log("I am in");
   if(!store_location || !currency || !tax_percentage || !premium_items){
    return res.status(401).json({
  "success": false,
  "message": "Store with this location already exists",
})
}
try{
    const ss= new Store(store_location,currency,tax_percentage,premium_items);
    await ss.save();
    return res.status(200).json({
  "success": true,
  "message": "Store Created Successfully",
})
}
catch(err){
    console.error;
}

});
app.put("/store/:store_location",async(req,res)=>{
  try{  
    const{store_location}=body.param;
    
    const update= await Store.findOneAndUpdate(
        {location:store_location},
        req.body,
    );
    if(!update){
        return res.status({
  "success": false,
  "message": "Store with this location doesn't  exists",
})}
  return res.status(200).json({
  "success": true,
  "message": "Store Updated Successfully",
});
  }
  catch(err){
    console.error;
  }

});
app.post("/plan",async(req,res)=>{
  const add= await Plan.create(req.body);
  res.status(200).json({
  "plan_id": add._id,
  "store_location": add.store_location,
  "success": true,
  "message": "Plan Created Successfully",
})
});
app.get("/plan/:plan_id",async(req,res)=>{
   const getplan= await Plan.findById(req.params.id);
   res.status(200).json(getplan);
})

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

// const connetDB= async() =>{
//     try{
//   await mongoose.connect(MONGO_URI);
//   console.log(' Connected to MongoDB');
//     }
//     catch(error){
// console.error('MongoDB connection error:', err);
//     }
    
//}