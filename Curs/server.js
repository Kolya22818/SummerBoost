const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/submit', (req, res) => {
    const answers = req.body;
    console.log("Получены данные от клиента:", answers); // ← ЭТО ВАЖНО

    const textData = Object.entries(answers)
        .map(([q, a]) => `${q}\nОтвет: ${a}\n`)
        .join('\n');

    fs.appendFile('answers.txt', `\n=== Новый ответ ===\n${textData}`, err => {
        if (err) {
            console.error('Ошибка при записи в файл:', err);
            res.status(500).send('Ошибка сервера');
        } else {
            res.send('Ответ сохранен в нашу базу');
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
