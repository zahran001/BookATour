const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path"); // To access the backend directory
const cors = require("cors");

app.use(express.json()); // request from response will be passed through json
app.use(cors()); 
// reactJS project will connect to express app on port 4000

// creating a MongoDB Atlas database connection
mongoose.connect("mongodb+srv://zykkhanbd:bookatour@cluster0.fkpivbc.mongodb.net/bookatour");
// API endpoint
app.get("/",(req,res)=>{
    res.send("Express app is running")
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on Port "+ port)
    }
    else{
        console.log("Error : "+error)
    }
})

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// Middleware 
const upload = multer({storage:storage})

// endpoint for uploading images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })

})

// Schema for creating Stops
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    }, 
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
})

// adding Stops
app.post('/addproduct',async (req,res)=>{
    let products =  await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        category:req.body.category,
        image:req.body.image,
        location:req.body.location,
    });
    console.log(product);
    await product.save();
    // saving it to the database

    console.log("saved");

    // generate response for the frontend
    res.json({
        success:true,
        name:req.body.name,
    })

})

// API for deleting Stops
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({ id:req.body.id });
    console.log("Removed");

    res.json({
        success:true,
        name:req.body.name
    })

})

// API for list of products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("all products fetched");
    res.send(products);
})


// User portal schema
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }

})

// User registration
app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"user already registered"});
    }
    let cart =  {};
    for(let i = 0; i<300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    
    // save it in database
    await user.save(); 

    // JWT
    const data = {
        user:{
            id:user.id
        }
    }

    const token =  jwt.sign(data,'secret_app');
    res.json({success:true,token})
})


// login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCheck = req.body.password === user.password;
        if(passCheck){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_app');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Password does NOT match"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong email provided"});
    }

})


// fetch
    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if(!token){
            res.status(401).send({errors:"Invalid authentication token"});
        }
        else{
            try {
                const data = jwt.verify(token,'secret_app');
                req.user = data.user;
                next();            
            } catch (error) {
                res.status(401).send({errors:"Invalid authentication token"})
            }
        }

    } 

// cart
app.post('/addtocart',fetchUser, async (req,res)=>{
    console.log("added",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");

})

// remove
app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log("removed",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -= 1;
    }    
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");


})

// cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);

})


