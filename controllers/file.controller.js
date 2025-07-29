import multer from 'multer';
import { Queue } from 'bullmq';
import redisConnection from '../redis-connection.js';

const queue = new Queue('pdf-upload-queue', {
    connection: redisConnection
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  await queue.add('file-ready', JSON.stringify({
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
      id: req.body.emailId
  }))
  return res.json({ message: 'File uploaded successfully!' });
}

export {upload, uploadFile};