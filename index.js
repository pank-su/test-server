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
app.get("/file/:filename", function (request, response) { // Функция для получения файлов
    try {
        let file = fs.createReadStream('./documents/' + request.params.filename);
        let stat = fs.statSync('./documents/' + request.params.filename);
        response.setHeader('Content-Length', stat.size);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename=' + request.params.filename);
        file.pipe(response);
    } catch (e) {
        response.status(400)
        response.send("File not found")
    }

})

app.get("/docs_info/", function (request, response) {
    response.setHeader("Content-Type", "application/json")
    response.send({"test": "test.pdf"})
})

app.get("/test/:test_num", function (request, response) {
    let file_name = "./tests/" + request.params.test_num + ".json"
    fs.readFile(file_name, 'utf-8', ((err, data) => {
        if (err){
            response.status(400)
            response.send("Test not found")
        } else{
            response.header("Content-Type", "application/json")
            response.send(data)
        }

    }))
})
app.listen(8080, "localhost")