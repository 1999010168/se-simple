import pkg from 'sequelize';
const { Sequelize, DataTypes } = pkg;
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.data,
  logging: false
});



const Project = sequelize.define('Project', {
  url: DataTypes.STRING,
  lx: DataTypes.INTEGER,
  yx: DataTypes.INTEGER,
  jd: DataTypes.INTEGER
})

const Student = sequelize.define('Student', {
  No: DataTypes.STRING,
  name: DataTypes.STRING,
  login: DataTypes.STRING,
  class: DataTypes.STRING,
})

Student.belongsTo(Project)
Project.hasMany(Student)

async function syncDB() {
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }
  // await sequelize.sync({ alter: true });
  console.log("所有模型均已成功同步.");
}

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   await syncDB();
// }

export { syncDB, Student, Project }