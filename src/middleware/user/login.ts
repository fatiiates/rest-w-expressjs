import db from '../../../db';
import md5 from 'md5';


const login = async (req, res) => {

  const data: {
    email: string;
    password: string;
  } = req.body.data;

  try {
    const querySelect:any =`SELECT * FROM users WHERE email='${data.email}' AND password='${md5(data.password)}'`;
    await db.query(querySelect, async function(err, result, fields){
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
        const vars = JSON.stringify(Object.assign({}, result));
        res.status(200).send(vars);
      }
    }); 
  } catch (error) {
    console.log(error);
    return res.status(500).send({ 
      message: "Sorgulama sırasında bir hata meydana geldi."
    });
  }

}

export default login;
