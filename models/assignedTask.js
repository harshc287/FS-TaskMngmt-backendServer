const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db')

const AssignedTask = sequelize.define("AssignedTask",{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },

    taskId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
    }

},{
    tableName: "assigned_tasks",
    timestamps: true,
})

module.exports=  AssignedTask;
