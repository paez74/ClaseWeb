'use strict';
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var PokemonCard = sequelize.define('PokemonCard', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        weight: {
            type:Sequelize.DOUBLE,
        },
        description: {
            type: Sequelize.STRING,
            allowNull:false
        },
        type: {
            type:   Sequelize.ENUM,
            values: ['item', 'price','element'],
            allowNull: false
        },
        class: {
            type: Sequelize.STRING
        }
    });

    return PokemonCard;
};