const multer = require("multer");
const fs = require("fs");
const path = require("path");

function imageFilter(req, file, cb) {
    const mimeType = file.mimetype.split('/')[0];
    const subMimeType = file.mimetype.split('/')[1];
    if(mimeType === 'image'){
        if(subMimeType === 'jpeg' || subMimeType === 'jpg' || subMimeType === 'png')
            cb(null, true);
        else{
            req.fileTypeError = true;
            cb(null, false)
        }
    }else{
        req.fileTypeError = true;
        cb(null, false)
    }
}

function uploadSingleImage(type, pathToSave) {
    const myStorage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, new Date().getTime() + "-" + file.originalname);
        },
        destination: function (req, file, cb) {
            cb(null, `./uploads/image/${pathToSave || ''}`);
        }
    });
    const mul = multer({
        storage: myStorage,
        fileFilter: imageFilter
    })
    return mul.single(type);
}

function fileRemover(data) {
    fs.unlink(path.join(process.cwd(), "uploads/" + data),
     function (        err,        done    ) {
        if (err) {
            console.log("file removing error");
        } else {
            console.log("file removed");
        }
    });
}

module.exports = {uploadSingleImage, fileRemover};
