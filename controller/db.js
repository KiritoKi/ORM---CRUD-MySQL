import { createConnection } from 'mysql';

var connection = createConnection({
    host: 'localhost',
    user: 'kirito',
    password: 'yanVP&123456',
    database: 'db_faculdade'
});

connection.connect();

export default connection;