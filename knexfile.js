const dotenv = require('dotenv');
dotenv.config();

console.log(process.env)

module.exports={
  development:{
    client:process.env.DIALECT,
    connection:{
      host:process.env.DB_HOST,
      user:process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_NAME
    },
    debug:true,
  }
}