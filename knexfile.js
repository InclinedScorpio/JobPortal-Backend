const dotenv = require('dotenv');
dotenv.config();

module.exports={
  development:{
    client:process.env.DIALECT,
    connection:{
      host:process.env.DB_HOST,
      user:process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_NAME
    },
    debug:false,
  }
}