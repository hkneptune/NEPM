'use strict';

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const ENV = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[ENV];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

fs.readdirSync(__dirname).filter((file) => {

  return (file.indexOf(".") !== 0) && (file !== "index.js")

}).forEach((file) => {

  let model = sequelize.import(path.join(__dirname, file))
  db[model.name] = model

})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
