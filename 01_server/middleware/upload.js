var multer = require('multer');


uploadImage = () => {
    const imageStorage = multer.diskStorage({
        dest: (req, file, cb) => { cb(null, path.join(__dirname, "../profile")); },
        filename: (req, file, cb) => { cb(null, file.originalname); }
    })

    const imageFileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('You can upload only image files!'), false);
        }
        cb(null, true)
    };
    return multer({imageFileFilter, imageStorage})
}

module.exports = uploadImage;