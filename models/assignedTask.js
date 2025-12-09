const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db')

const AssignedTask = sequelize.define("AssignedTask",{
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },

    taskTitle:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    assignedTo:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
     assignedBy:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        defaultValue:"pending",
    },

    priority:{
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },

},{
    tableName: "assigned_tasks",
    timestamps: true,
})

module.exports=  AssignedTask;
