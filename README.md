#### API имеет следующий стек технологий:
- Node.js
- Express.js
- MySQL
- Typescript

##### API имеет следующие методы:
- Регистрация пользователя (POST /user/register)
- Авторизация пользователя (POST /user/login)
- Редактирование пользователя (PUT /profile/[id])
- Получение пользователя (GET /profile/[id])
- Получение всех пользователей с пагинацией (GET /profiles?page=1, 10 на страницу)

##### Требования:
- У каждого пользователя должно быть ID, Имя, Фамилия, Email, Пароль, Пол (Мужской, Женский), Фото, Дата регистрации.
- При регистрации указывает только Имя, Email, Пароль.
- При редактировании можно менять всю информацию кроме ID, Пароля, Дата регистрации.
- При получение всех пользователей с пагинацией сортировать по дате регистрации.
- В базе данных хранить только название файла, все фото должны лежать в папке и раздаваться статически.
- Валидация входных параметров
- Используется Prisma ORM с подключением через Yandex Cloud
- Используется JWT
- Пароль будет хранится как хеш
- Проверка фото по размеру, и формату (до 10 мб, .jpg, .png)