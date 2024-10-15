const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    name: {
        type: String,
        required: [true, "add product name"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, " add  category"],
        trim: true,
    },
    quantity: {
        type: String,
        required: [true, " add  quantity"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "add  price"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "add desc"],
        default:"filee",
        trim: true,
    },
    image: {
        type: String,
        default:"filee",
        required: [true, "add image"],

    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
    },
    maxDistance:{
        type:Number,
        required:[true,"add distance"]

    },

},
    {
        timestamps: true,
    }
);


 productSchema.index({ description: 'text',name:'text',category:'text'});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;