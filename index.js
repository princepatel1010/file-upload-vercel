const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

app.post('/upload', upload.any(), (req, res) => {
  try {
    const file = req.files[0];
    const dir = path.join(__dirname, 'image');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, `${Date.now()}.png`);
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
      } else {
        console.log('File has been written successfully.');
      }
    });
    res.send('File uploaded');
  } catch (error) {
    res.send(error);
  }
});

app.listen(8001, () => console.log(`Server running...`));

module.exports = app;
