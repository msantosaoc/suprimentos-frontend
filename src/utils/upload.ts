// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public/uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString()+'-'+file.originalname)
//     }
// });

// const fileFilter = (req: any, file: any,  cb: any) => {
//     if(file.mimetype === 'application/json' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//         cb(null, true)
//     } else {
//         false
//     }
// }

// const upload = multer({
//     storage,
//     limits: {
//         fieldSize: 1024 * 1024
//     },
//     fileFilter
// });

// export default upload;

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3 = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'arquivos-compras',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata(req, file, cb) {
            cb(null, {
                fieldName: file.fieldname
            });
        },
        key(req, file, cb) {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `{${hash.toString('hex')}-${file.originalname}}`;

                cb(null, fileName);
            })
        }
    })
})

export default upload;