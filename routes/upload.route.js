const cloudinary = require('cloudinary');
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = require('./category.route');
const fs = require('fs');
const path = require('path');

//image upload
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//upload
router.post('/upload', auth, (req, res) => {
    try {
        if(!req.files || Object.keys(req.files).length == 0){
            return res.status(400).json({message: "no file uploaded"})
        }
        //
        const file = req.files.file;
        let supportedType = [".jpg", ".png", ".jpeg"];
        let fileType = path.extname(file.name);
        //file size check
        if(file.size > 1024*1024){
            removeTempFile(file.tempFilePath);
            return res.status(400).json({message: "max file size exceeded"});
        }
        //file format check
        if(!supportedType.includes(fileType)){
            removeTempFile(file.tempFilePath);
            return res.status(400).json({message: `${fileType} not supported`});
        }
        //upload to cloudinary
        cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
            if(err) throw err;
            removeTempFile(file.tempFilePath);
            res.json({
                success: true,
                public_id: result.public_id, 
                url: result.secure_url
            })
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})
//delete
router.post("/delete", auth, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ message: "no image selected" });
    }
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ message: "image deleted" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


const removeTempFile = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

module.exports = router;