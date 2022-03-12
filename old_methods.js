// файл для хранения методов которые могут понадобится в будующем

// Метод получения теста по номеру теста из бд
app.get("/test/:test_num", function (request, response) {

    // Обращение к бд по пути
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('./db/db.db');

    // SQL-запрос
    db.serialize(function () {
        db.get("select json from tests where id = ?", [request.params.test_num], function (err, table) {
            if (err) {
                response.status(400)
                response.send("Test not found")
            } else {
                response.header("Content-Type", "application/json")
                response.send(table)
            }
        });
    });

    db.close();
})

