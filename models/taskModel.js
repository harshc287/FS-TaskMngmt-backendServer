const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db')

const Task = sequelize.define("Task", {
    id:{
        type:DataTypes.BIGINT.UNSIGNED,
        primaryKey:true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING(200),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    status:{
        type: DataTypes.ENUM('pending', 'Inprogress', 'Completed'),
        defaultValue:'pending'
    },
    priority:{
        type: DataTypes.ENUM('Low','Medium','High', 'critical'),
        defaultValue:'Medium'
    },
    startDate:{
        type: DataTypes.DATE
    },
       endDate:{
        type: DataTypes.DATE
    }
},{
    tableName:'tasks',
    timesStamps:true
})

module.exports = Task