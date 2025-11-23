require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql2/promise");    // IMPORTANT
const db = require('./models');             // Sequelize models

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
const corsOptions = {
    origin: ['http://localhost:5143'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));


const PORT = process.env.PORT || 5000;

/**
 * Auto-create MySQL database if not exists
 */
async function createDatabaseIfNotExists() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);

        console.log(`✔ Database "${process.env.DB_NAME}" ready (created if missing)`);
        await connection.end();
    } catch (err) {
        console.error("❌ Error creating database:", err);
        process.exit(1);
    }
}

/**
 *  Start server only after DB is created + Sequelize synced
 */
async function startServer() {
    await createDatabaseIfNotExists();

    db.sequelize.sync({ force: false })
        .then(() => {
            console.log("✔ Sequelize tables synchronized");

            app.listen(PORT, () => {
                console.log(` Server running on port ${PORT}`);
            });
        })
        .catch(err => {
            console.error(" Failed to sync Sequelize:", err);
        });
}

startServer();
