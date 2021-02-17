import db from '../../../db';


const logger = async (req, res) => {

  const data: {
      id: string;
      user_token: string;
      user_fullname: string;
      filess: string;
      files_name: string;
      files_description: string;
  } = req.body.data;

  try {
    const querySelect:any =`INSERT INTO filesdata (user_id,filess,files_name,files_description) VALUES ('${data.id}','${data.filess}','${data.files_name}','${data.files_description}')`;
    await db.query(querySelect, async function(err){
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
        res.status(200).send({ message: "Dosya kaydı veritabanına işlendi."});
      }
    }); 
  } catch (error) {
    console.log(error);
    return res.status(500).send({ 
      message: "Sorgulama sırasında bir hata meydana geldi."
    });
  }
}

export default logger;
