require('dotenv').config();
const {Sequelize, Datatypes} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,{
     
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    
    define:{
        timestamps:true
    }
})

async function testConnection(){
    try {
        await sequelize.authenticate()
        console.log('database connection has been established successfully')
    } catch (error) {
        console.error('Unable to connect database:', error)
    }
}

async function syncDB({force = false, alter= false} = {}){
    try {
        await sequelize.sync({force, alter})
        console.log('all models were syncronized successfully.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}


testConnection()

module.exports = { sequelize, testConnection, syncDB };



