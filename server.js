const express = require('express');
const server = express();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${file.originalname}-${Date.now()}${extension}`);
  },
});

const upload = multer({ storage });

const port = process.env.PORT || 3100;

server.use(express.static('views'));
server.use(express.static('uploads'));

server.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
  if (!req.file) return res.status(400).send('Please upload a file!');
  console.log(req.file);
  return res
    .status(200)
    .send(
      `<h2>Here is the picture:</h2><img src="${req.file.filename}" alt="something" />`
    );
});

server.listen(port, () => console.log(`Server up on port ${port}`));
