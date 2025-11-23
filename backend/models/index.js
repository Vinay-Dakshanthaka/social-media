"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const dbConfig = require("../config/dbConfig.js");

// Sequelize connection initialization
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false,
        pool: dbConfig.pool
    }
);

const db = {};

const basename = path.basename(__filename);
const modelsDir = __dirname;

// Auto-load all models from /models folder
fs.readdirSync(modelsDir)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(modelsDir, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

// Run associations if model has associate()
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Export Sequelize connection + all models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
