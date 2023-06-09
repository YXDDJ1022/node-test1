const mysql = require('mysql2')
const { MYSQL_HOST } = require('./config')

const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
})

connections.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('数据库连接失败', err)
    }
    console.log('数据库连接成功')
  })
})

module.exports = connections.promise()
