// Конфигурация
const express = require("express")
const bodyParser = require("body-parser");
const fs = require("fs")
const { transliter } = require('transliter');
const path = require("path");

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())

// Страничка документации
app.get("/", function (request, response){
    response.sendFile(path.join(__dirname+ "/README.html"))
})

// Запросы с пустым методом
app.get("/status", function (request, response) { // Тестовый get-запрос
    response.send('ok')
})

app.post("/status", function (request, response) { // Тестовый post-запрос
    console.log(request.body)
    response.send("ok")
})


app.get("/docs/:filename", function (request, response) { // Функция для получения файлов
    // Получаем файл по имени
    let file = fs.createReadStream('./documents/' + request.params.filename);
    file.on('error', function (_) {
        response.status(400)
        response.send("File not found")
    });
    file.on('open', function (){
        let stat = fs.statSync('./documents/' + request.params.filename);
        response.setHeader('Content-Length', stat.size);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename=' + transliter(request.params.filename));
        // Отсылаем файл
        file.pipe(response)
    })
})

// Заглушка для метода получения информации о документе
app.get("/docs", function (request, response) {
    fs.readFile("./data/documents.json", 'utf-8', ((err, data) => {
        response.header("Content-Type", "application/json")
        response.send(data)
    }))
})


//Получение тестов
app.get("/tests", function (request, response) {
    fs.readFile("./data/tests.json", 'utf-8', ((err, data) => {
        response.header("Content-Type", "application/json")
        response.send(data)
    }))
})

console.log("Server run 0.0.0.0:3000")
app.listen(3000, '0.0.0.0')