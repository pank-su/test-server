const express = require("express")
const bodyParser = require("body-parser");
const fs = require("fs")

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())


app.get("/", function (request, response) { // Тестовый get-запрос
    response.send('ok')
})
app.post("/", function (request, response) { // Тестовый post-запрос
    console.log(request.body)
    response.send("ok")
})
app.get("/get_file/:filename", function (request, response) { // Функция для получения файлов
    // TODO Надо обезопасить данную функцию и сделать обработку ошибок
    console.log(request.params.filename)
    var file = fs.createReadStream('./' + request.params.filename);
    var stat = fs.statSync('./' + request.params.filename);
    response.setHeader('Content-Length', stat.size);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=' + request.params.filename);
    file.pipe(response);
})
app.listen(3000, "localhost")