const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/db")

const User = sequelize.define("User",{
    id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true,
},

name:{
    type: DataTypes.STRING,
    allowNull: false,


},
email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true

},
password:{
    type:DataTypes.STRING,
    allowNull:false,

},
role:{
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user"
},
address: {
    type: DataTypes.STRING,

},
    updatedBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    }

} , {tableName : "users", timestamps: true})

User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})


module.exports = User;