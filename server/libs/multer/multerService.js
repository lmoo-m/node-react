import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             `${Date.now()}-${Math.floor(Math.random() * 999)}-${
//                 file.originalname
//             }`
//         );
//     },
// });

const storage = multer.memoryStorage();

const image = multer({
    storage,
});

export default image;
