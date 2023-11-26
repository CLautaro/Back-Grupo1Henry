const server = require('./src/server');
const { conn } = require('./src/DB_connection');
const PORT = 3001;


conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });
})
.catch((err) => console.error('Error syncing database:', err));
