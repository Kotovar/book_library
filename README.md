# book_library

[![CI/CD](https://github.com/Kotovar/book_library/actions/workflows/main.yml/badge.svg)](https://github.com/Kotovar/book_library/actions/workflows/main.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8f1e255d-11ce-49d0-8ede-46850be66f1d/deploy-status)](https://app.netlify.com/sites/google-book-library/deploys)

Приложение для поиска книг с возможностью аутентификации в приложении и добавления книг в избранное.

[Live preview](https://google-book-library.netlify.app/)

## Как использовать

Чтобы использовать данное приложение, в вашей системе должны быть установлены Node.js и npm. Вы можете клонировать этот репозиторий и выполнить следующие команды:

`npm install` - для установки всех зависимостей

`npm run dev` - для запуска локального сервера с приложением

открыть `http://localhost:[path]` в своём браузере

## Как это работает

Для поиска книг используется [Google Books API](https://developers.google.com/books/docs/overview)

Для регистрации и аутентификации используется [Firebase API ](https://firebase.google.com/)

Основа проекта - redux toolkit и RTK Query

Так же использовалось:

- React
- Typescript
- Github Actions CI/CD
- CSS modules
- Библиотеки:
  - react-hot-toast
  - use-debounce
  - react-hook-form

## Были выполнены следующие задачи:

### 1 уровень (обязательный - необходимый минимум)

**Общее**

- [x] Реализованы **Требования к функциональности**.
- [x] Использование **LocalStorage** или **Firebase**.

**React**

- [x] Использовать **функциональные компоненты с хуками**.
- [x] Есть **разделение на умные и глупые компоненты**.
- [x] Есть [**рендеринг списков**](https://github.com/Kotovar/book_library/blob/main/src/pages/HomePage/HomePage.tsx).
- [x] Реализована [**хотя бы одна форма**](https://github.com/Kotovar/book_library/blob/main/src/pages/SignIn/SignIn.tsx).
- [x] Есть применение [**Контекст API**](https://github.com/Kotovar/book_library/blob/main/src/app/context/ThemeContext.ts).
- [x] Есть применение [**предохранителя**](https://github.com/Kotovar/book_library/blob/main/src/App.tsx).
- [x] Есть хотя бы один [**кастомный хук**](https://github.com/Kotovar/book_library/blob/main/src/utils/useFirebaseAuth.ts).
- [x] **Хотя бы несколько компонентов используют PropTypes**: [BookCardMiniFavorite](https://github.com/Kotovar/book_library/blob/main/src/components/BookCardMini/BookCardMiniFavorite.tsx), [SearchForm](https://github.com/Kotovar/book_library/blob/main/src/components/SearchForm/SearchForm.tsx)
- [x] Поиск не должен триггерить много запросов к серверу [**debounce**](https://github.com/Kotovar/book_library/blob/main/src/components/SearchForm/SearchForm.tsx).
- [x] Есть применение [**lazy + Suspense**](https://github.com/Kotovar/book_library/blob/main/src/routes/Router.tsx).

**Redux**

- [x] Используем **Modern Redux with Redux Toolkit** - [store](https://github.com/Kotovar/book_library/blob/main/src/app/store.ts).
- [x] Используем [**слайсы**](https://github.com/Kotovar/book_library/blob/main/src/features/featureAuthorization/AuthorizationSlice.ts).
- [x] Есть хотя бы одна [**кастомная мидлвара**](https://github.com/Kotovar/book_library/blob/main/src/app/middlewares/userAuth.ts).
- [x] Используется [**RTK Query**](https://github.com/Kotovar/book_library/blob/main/src/features/featureBooksApi/booksApi.ts).
- [x] Используется [**Transforming Responses**](https://github.com/Kotovar/book_library/blob/main/src/features/featureBooksApi/booksApi.ts).

### 2 уровень (необязательный)

- [x] Использование **TypeScript**.
- [x] Использование [**Firebase**](https://github.com/Kotovar/book_library/blob/main/src/services/firebaseConfig.ts).
- [x] Настроен [**CI/CD**](https://github.com/Kotovar/book_library/blob/main/.github/workflows/main.yml)
- [x] Используются [**мемоизированные селекторы**](https://github.com/Kotovar/book_library/blob/main/src/utils/selectors.ts)
- [x] Низкая связанность клиентского кода с хранилищем. У нас есть кастомный хук, который пишет данные в Firebase или забирает оттуда. В нём функции описаны нейтрально - удалить данные об избранном, записать данные об избранное - нет понимания, куда пишется. [Пример для избранного](https://github.com/Kotovar/book_library/blob/main/src/utils/useChangeFavorites.ts), [пример для истории](https://github.com/Kotovar/book_library/blob/main/src/utils/useChangeHistory.ts)
