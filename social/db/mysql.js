var mysql = require('mysql')

var client=mysql.createConnection({
    user:'root',
    password:'qkrcjfgud12',
    database:'social',
    multipleStatements: true
})

client.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + client.threadId);
});

module.exports=client
