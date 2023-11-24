const server = require("./src/server");
const { conn } = require("./src/DB_connection");

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
});
