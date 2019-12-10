//A SOLUTION TO REQUIRE LOOPS 
//OR JUST PUT REQUIRED MODELS INSIDE GETTER OF RELATIONMAPPING

const { Model } = require("objection");

class BaseModel extends Model{
    static get modelPaths() {
        return [__dirname];
      }
}

module.exports = {
    BaseModel
}