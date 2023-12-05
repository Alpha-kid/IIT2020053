const express = require('express');
const multer = require('multer');
const path = require('path');
const connectToDatabase=require('./db')
const bodyParser = require('body-parser');
const detectTextByDocument = require('./convert_image/detectText.js')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set up multer for handling file uploads
connectToDatabase();
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });


// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Static/Homepage.html'));
});
app.get('/Homepage.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/Static/Homepage.html'));
});
app.get('/upload.html',(req,res) => {
  res.sendFile(path.join(__dirname, '/Static/upload.html'))
})
app.get('/2245291.png',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/2245291.png'))
})
app.get('/modifydb.html',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/modifydb.html'))
})
app.get('/show_database.html',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/show_database.html'))
})
app.get('/enterdatamanually.html',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/enterdatamanually.html'))
})
app.get('/wanttoadd.html',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/wanttoadd.html'))
})
app.get('/errorpage.html',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/errorpage.html'))
})
app.get('/blackbackground.png',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/blackbackground.png'))
})
app.get('/black2.jpg',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/black2.jpg'))
})
app.get('/errorpage.jpg',(req,res) => {
  res.sendFile(path.join(__dirname, './Static/errorpage.jpg'))
})
app.use('/id',require('./endpoint/Id.js'))
// Handle file upload
app.post('/upload', upload.single('image'), async (req, res) => {
  // Access uploaded image from req.file.buffer
  const imageData = req.file.buffer;

  const data = await detectTextByDocument(imageData);

  if (!data.success) {
      res.sendFile(path.join(__dirname, '/Static/errorpage.html'));
      return;
  }

  // You can send additional data along with the HTML response
  res.redirect(`/wanttoadd.html?jsonData=${encodeURIComponent(JSON.stringify(data.data))}`);

});
  
  // Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});