import express, { Router, Request, Response } from 'express';

import loginMiddleware from '../../middleware/user/login';
import registerMiddleware from '../../middleware/user/register';
import logoutMiddleware from '../../middleware/user/logout';
import loggerMiddleware from '../../middleware/user/logger';

class UserController {

  public router: Router = express.Router();

  constructor() {
      this.initRoutes();
  }


  public initRoutes(): void {
      this.router.post('/register', this.register)
      this.router.post('/login', this.login)
      this.router.post('/logger', this.logger)
      this.router.get('/logout', this.logout)
  }

  private async login(req: Request, res: Response) {

    try {
      if(typeof req.body.data == 'undefined')
        res.status(404).send({ 
          message: "Kullanıcı bilgileri bulunamadı." 
        });
      else
       await loginMiddleware(req, res);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ 
        message: "Beklenmeyen bir sorun oluştu",
        error: e
      });    
    }
  }
  private async register(req: Request, res: Response){
    try {
      if(typeof req.body.data == 'undefined')
        res.status(404).send({ 
          message: "Kullanıcı bilgileri bulunamadı." 
        });
      else
        await registerMiddleware(req, res);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ 
        message: "Beklenmeyen bir sorun oluştu",
        error: e
      });
    }
  }

  private logout(req: Request, res: Response){
    try {
      logoutMiddleware(req, res);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ 
        message: "Beklenmeyen bir sorun oluştu",
        error: e
      });    
    }
  }

  private async logger(req: Request, res: Response){
    try {
      if(typeof req.body.data == 'undefined')
        res.status(404).send({ 
          message: "Kullanıcı bilgileri bulunamadı." 
        });
      else
        await loggerMiddleware(req, res);
    }
    catch(e){
      console.log(e);
      res.status(500).send({ 
        message: "Beklenmeyen bir sorun oluştu",
        error: e
      });    
    }
  }
}
export default UserController;
