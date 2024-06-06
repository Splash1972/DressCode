const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Attire extends Model {}

Attire.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        weather: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        suggestion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'attire',
    }
);

module.exports = Attire;
