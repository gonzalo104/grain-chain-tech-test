require('../../config')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }).single('file')
const uploadFile = require('app/middlewares/upload-file')
const Controller = require('app/controllers/rooms-to-be-iluminated')

module.exports = app => {
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('./views/index.html'))
  })
  app.post('/upload-matriz', uploadFile, upload, Controller.start.bind(Controller))
}
