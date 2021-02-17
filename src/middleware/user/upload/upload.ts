import util from 'util';
import path from 'path';
import multer, { StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'; 
import db from '../../../../db';

const maxFileSize: number = 10 * Math.pow(2, 20); // 10 MB

const existDirectory: any = async (req, callback) => {
  const email: string = req.query.email;
  const querySelect:any =`SELECT * FROM users WHERE email='${email}' LIMIT 1`;
  try {
    await db.query(querySelect, function(err, result){
      if(err){
        if(err.code == "ECONNREFUSED")
          return callback({ 
            message: "Veritabanına bağlanılamıyor."
          });
        else
          return callback({ 
            message: "Bilinmeyen bir sorun oluştu."
          });        
      }
      else{
        let directory_id: string = result[0]['directory_id'];
        let dir: string = globalThis.__basedir + "/files/uploads/" + directory_id;
        if(!fs.existsSync(dir))
          fs.mkdirSync(dir);
        return callback(dir);
      }
    });  
  } catch (error) {
    return callback({ message: "Bir sorun oluştu."});
  }  
};

// Create the multer StorageEngine docs: https://www.npmjs.com/package/multer
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    existDirectory(req, function(dir){
      if(typeof dir == "string")
        callback(null, dir);   
    });
  },
  filename: (req, file, callback) => {
    
    let extension = path.extname(file.originalname).substring(0, 10);
    let filename = (uuidv4() + extension);
    
    callback(null, filename);
  },
});

// Creates a multer instance for upload file.
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
  fileFilter: function (req, file, callback) {
    if (file.mimetype != "text/plain") 
      return callback(null, false);           
      callback(null, true);
  }
}).single("file");

// Exports an upload middleware promise 
const uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;

