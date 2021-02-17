import express, { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import underScore from 'underscore';
import contentDisposition from 'content-disposition';

import fileUploadMiddleware from '../../middleware/user/upload/upload';

// Create MulterRequest interface for upload middleware
interface MulterRequest extends Request {
  file: any;
}

// Create FileController for my Express app
class FileController {
  // Create Router for service end point
  public router: Router = express.Router();
  
  constructor() {
      this.initRoutes();
  }

  // Adds uplaod and download endpoint to router
  public initRoutes(): void {
      this.router.get('/download', this.download)
      this.router.post('/upload', this.upload)
  }

  // When a request post to the "/upload" endpoint, loads the incoming file
  private async upload(req: MulterRequest, res: Response): Promise<express.Response<any>> {
    
    // Exception Handling
    try {   
      // An async file upload middleware
      if(typeof req.query == 'undefined'){
        return res.status(404).send({ 
          message: "Kullanıcı bilgileri bulunamadı." 
        });
      }
      else
        await fileUploadMiddleware(req, res);

      if (req.file == undefined) 
        return res.status(400).send({ 
          message: "Lütfen bir dosya yükleyin!" 
        });
      else if (req.file.mimetype != "text/plain")
        return res.status(400).send({ 
          message: "Yalnızca metin dosyaları yüklenebilir." 
        });
      else
        return res.status(200).send({
          message: `Dosya yüklemesi başarılı.`,
          filename: req.file.originalname
        });
      
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") 
        return res.status(500).send({
          message: "Dosya boyutu en fazla 10 MB olabilir!",
        });
      else if (err.code == "ENAMETOOLONG") 
        return res.status(500).send({
          message: "Dosya adı çok uzun!",
        });
      else
        return res.status(500).send({
          message: `Bir sorun oluştu! Dosya yüklenemedi.`,
          error: err
        });
    }
  }
  // Searches for the last uploaded file in the "./files/uploads" directory
  private getLastUploadedFile(files: Array<string>, directoryPath: string): any {
    
    // Returns filename or false 
    var fileName: any = underScore.max(files, function (fileName) {
      var fullpath = path.join(directoryPath, fileName);
      
      if(fs.statSync(fullpath).isFile())
        return fs.statSync(fullpath).birthtimeMs;
      else
        return this.getLastUploadedFile(files.filter(word => word != fileName), directoryPath);
    });
    
    if(typeof fileName == "string")
      return fileName;
    else
      return "Undefined"
  }

  // When a request post to the "/download" endpoint, downloads the last uploaded file
  private download = (req: Request, res: Response): any => {

    const directoryPath: string = globalThis.__basedir + "/files/uploads/";

    var allFiles: Array<string> = fs.readdirSync(directoryPath);

    var lastUploadedFile: any = this.getLastUploadedFile(allFiles, directoryPath);
    if(lastUploadedFile == "Undefined")
      res.status(404).send({
        message: "Üzgünüz, indirilebilecek bir dosya mevcut değil."
      });
    else{
      res.set('Content-Disposition', contentDisposition(lastUploadedFile));
      res.download(directoryPath + lastUploadedFile, lastUploadedFile, (err: Error) => {
        if (err) 
          return res.status(500).send({
            message: "Üzgünüm, bir hata oluştu.",
            error: err
          });       
      });
    }
  }
}
export default FileController;