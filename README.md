# Cервер для хранения документов и тестов

GET:
- /file/[filename]<br>
  Content-Type: application/pdf<br>
  Получаем файл pdf по имени файла filename
- /docs_info/<br>
  Content-Type: application/json<br>
  Получаем информацию о документах(в разработке)
- /test/:test_num/<br>
  Content-Type: application/json<br>
  Получаем тест по номеру test_num
