const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        
      },
      originalprice: {
        type: Number,
     
      },
      discount: {
        type: Number,
      
      },
      description1: {
        type: String,
        
      },
      description2: {
        type: String,
       
      },
      description3: {
        type: String,
      },
      details: {
        type: String,
        required: true,
      },
      category: {
         type: String, 
         required: true 
        },  // This is just a basic representation. You might want to reference a Category model.
      option: {
         type: String, 
        required: true 
      }, 
      
      image: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
      },
      ratings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings",
      }],
      reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
      }],
      ratingCount:[{
        type: Number,
        default: 0,
      }],
      // category:[{
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "categories",
      // }],
      createdAt: {
        type: Date,
        default: Date.now(),
      }
});

const Product = mongoose.model('products',productSchema)
module.exports = Product