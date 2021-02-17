import mysql from 'mysql';

const config = {
  host: "localhost",
  database: "restfulapi",
  user: "root",
  password: ""
};

const db = mysql.createConnection(config);  

export default db;




