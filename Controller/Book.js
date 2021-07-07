const bookModel = require('../Model/Book')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertBook = (data) =>
  new Promise((resolve, reject) => {
    bookModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Buku')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllBook = () =>
  new Promise((resolve, reject) => {
    bookModel.find({})
     .then(book => resolve(requestResponse.suksesWithData(book)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    bookModel.findOne({
      _id: objectId(id)
    }).then(book => resolve(requestResponse.suksesWithData(book)))
    .catch(error => reject(requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise((resolve, reject) => {
    bookModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Data'))
      }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) =>{
    bookModel.findOne({
      _id: objectId(id)
    }).then(book => {
      bookModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(book.image)
        resolve(requestResponse.sukses('Berhasil Hapus Buku'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })