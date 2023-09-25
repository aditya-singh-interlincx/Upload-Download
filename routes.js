const appRoot = require('app-root-path')
const multer = require('multer')
const fs = require('fs')

const fileController = require(`${appRoot}/src/controllers/FileController.js`)
const INPUT_NAME = 'photos'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = 'files'
    fs.mkdirSync(path, { recursive: true })
    cb(null, path)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

module.exports = (app) => {
  app.use(multer({
    storage
  }).single('file'))
  app.post('/upload', fileController.upload)
  app.post('/download', fileController.download)
} 