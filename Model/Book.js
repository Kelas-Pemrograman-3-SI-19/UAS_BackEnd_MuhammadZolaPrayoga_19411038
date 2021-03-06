const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    judulBuku: {
        type: String
    },
    harga: {
        type: Number
    },
    tahun: {
        type: String,
        default: '2021'
    },
    genre: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('book', BookSchema)