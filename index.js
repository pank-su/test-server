const express = require("express")
const bodyParser = require("body-parser");

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

app.listen(3000, "localhost")