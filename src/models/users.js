module.exports = (sequelize, Sequelize) => {

  let Users = sequelize.define('sg_users', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    // uuid: {
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    //   allowNull: false,
    //   notEmpty: true,
    //   unique: true
    // },
    first_name: {
      type: Sequelize.STRING,
      notEmpty: true,
      validate: {
        len: [1, 128],
        min: 1,
        max: 128
      }
    },
    last_name: {
      type: Sequelize.STRING,
      notEmpty: true,
      validate: {
        len: [1, 128]
      }
    },
    username: {
      type: Sequelize.STRING(32),
      allowNull: false,
      notEmpty: true,
      unique: true,
      validate: {
        len: [6, 32]
      }
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        validate: {
          len: [6, 64]
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },
    last_login: {
      type: Sequelize.DATE(6)
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  })

  return Users
}
