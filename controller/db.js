import { createConnection } from 'mysql';

var connection = createConnection({
    host: 'localhost',
    user: '****',
    password: '****',
    database: 'db_faculdade'
});

connection.connect();

export default connection;
