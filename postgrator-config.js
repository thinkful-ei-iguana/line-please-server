require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DB_URL || 'postgresql://anugrahlambogo@localhost/Line-Please',
}