import db from '../../../db';
import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';

const register = async (req, res) => {

  const data: {
      user_fullname: string;
      email: string;
      password: string;
  } = req.body.data;

  try {
    const querySelect:any =`SELECT * FROM users WHERE email='${data.email}' LIMIT 1`;
    await db.query(querySelect, async function(err, result){
      if(err){
        if(err.code == "ECONNREFUSED")
          return res.status(404).send({ 
            message: "Veritabanına bağlanılamıyor."
          });
        else{
          console.log(err);
          return res.status(500).send({ 
            message: "Bilinmeyen bir sorun oluştu."
          }); }
      }
      else{
        if(result.length)
          res.status(500).send({ 
            message: "Girdiğiniz email ile kayıtlı bir kullanıcı bulunuyor."
          });
        else{
          const queryInsert:any =`INSERT INTO users (directory_id,user_fullname,email,password) values ('${uuidv4()}', '${data.user_fullname}','${data.email}','${md5(data.password)}')`;
          await db.query(queryInsert, async function(err){
            if(err){
              if(err.code == "ECONNREFUSED")
                return res.status(404).send({ 
                  message: "Veritabanına bağlanılamıyor."
                });
              else{
                console.log(err);
                return res.status(500).send({ 
                  message: "Bilinmeyen bir sorun oluştu."
                }); }
            }
            else{
              res.status(200).send({ message: "Kullanıcı kaydı başarılı."});
            }
          });
        }    
      }
    }); 
     
  } catch (error) {
    console.log(error);
    return res.status(500).send({ 
      message: "Sorgulama sırasında bir hata meydana geldi."
    });
  }

}

export default register;
