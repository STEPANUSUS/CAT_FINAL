const mysql = require('mysql2/promise');

exports.handler = async () => {
    // Параметры подключения к базе данных
    const connection = await mysql.createConnection({
        host: 'sql7.freesqldatabase.com',
        user: 'sql7759627',
        password: 'gFtiNX8IUc',
        database: 'sql7759627',
        port: 3306
    });

    try {
        // Запрос для получения лидеров по максимальному счету
        const query = 'SELECT user_id, MAX(score) as max_score FROM leaderboard GROUP BY user_id ORDER BY max_score DESC';
        const [rows] = await connection.execute(query);
        await connection.end();

        // Возвращаем данные в формате JSON
        return {
            statusCode: 200,
            body: JSON.stringify(rows)
        };
    } catch (error) {
        // Обработка ошибок и закрытие соединения
        await connection.end();
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving leaderboard', error: error.message })
        };
    }
};
