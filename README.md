# Cервер для хранения документов и тестов

Главный адрес: [api.pank.su](http://api.pank.su)

## Проверка роботоспособности сервера [/status](http://api.pank.su/status)

### GET/POST

Возвращаемое значение:

```text
ok
```

Возвращаемый статус(code):

- 200 или 304 - сервер в рабочем состоянии
- Connection timed out - сервер не работает

Использование: для проверки работоспособности сервера.

## Получение списка документов [/docs](http://api.pank.su/docs)

Content-Type: application/json;\
Возвращаемое значение: \
Список(JSONArray) содержащие объект(JSONObject) вида:

```json lines
{
  // Имя обозначающее определённое предназначение
  "name": STRING,
  // путь для получения документа через запрос /docs/[filename]
  "filepath": STRING
}
```

Пример:

```json
[
  {
    "name": "Безопасное вождение",
    "filepath": "Безопасное вождение.pdf"
  },
  {
    "name": "Нормативно-технический документ",
    "filepath": "Нормативно-технический документ.pdf"
  }
]
```

Использование: Для получения списка документов, чтобы в дальнейшейм их скачать.

## Получение документа [/docs/[filename]](http://api.pank.su/docs/test.pdf)

Content-Type: application/pdf;\
Возвращаемое значение: \
Файл в формате pdf.

### ВАЖНО

Файлы содержащие в названии кириллицу, переводят в названии на латиницу.

## Получение тестов [/tests](http://api.pank.su/tests)

Content-Type: application/json;\
Возвращаемое значение:\
Список(JSONArray) содержащие объект(JSONObject) вида:

```json lines
{
  // Название теста
  "title": STRING,
  // Количество вопросов
  "question_count": INT,
  // Список вопросов, структура вопроса показана ниже
  "questions": JSONArray<Question>
}
```

Question(JSONObject):

```json lines
{
  // Текст вопроса
  "question": STRING,
  // Список ответов
  "answers": JSONArray<STRING>,
  // Список(сделано на будующее, если будет несколько ответов) ответов
  "correct": JSONArray<INT>
}
```

Пример:

```json lines
{
  "title": "try_test",
  "question_count": 1,
  "questions": [
    {
      "question": "2 + 2?",
      "answers": [
        "213",
        "10",
        "4",
        "3"
      ],
      "correct": [
        2
      ]
    }
  ]
}
```

### ВАЖНО
Список ответов содержит в себе номера ответов, нумерация которых начинается с 0;
