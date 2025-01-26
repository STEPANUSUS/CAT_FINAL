const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const { user_id, score } = JSON.parse(event.body);

    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7759627',
        password: 'gFtiNX8IUc',
        database: 'sql7759627',
        port: 3306
    });

    try {
        const query = 'INSERT INTO leaderboard (user_id, score) VALUES (?, ?)';
        await connection.execute(query, [user_id, score]);
        await connection.end();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Score submitted successfully' })
        };
    } catch (error) {
        await connection.end();
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting score', error: error.message })
        };
    }
};
