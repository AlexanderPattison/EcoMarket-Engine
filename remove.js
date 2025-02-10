const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alexpattison777:oJjOlVzJsG0xXiLD@cluster0.ux0tx.mongodb.net/db', {
    writeConcern: {
        w: 'majority',
        wtimeout: 5000
    }
});

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    stock: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema, 'products');

async function removeQuantityField() {
    try {
        console.log('Starting to remove quantity field...');
        const result = await Product.updateMany({}, { $unset: { quantity: 1 } });
        console.log('Update result:', result);
        console.log('Modified count:', result.modifiedCount);
    } catch (err) {
        console.error('Error updating products:', err);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
}

removeQuantityField();