# модуль "PortfolioOverview"

## Тестовое задание

Этот проект создан с использованием [Next.js](https://nextjs.org) и инициализирован с помощью [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Начало работы

Для запуска сервера разработки выполните команду:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере, чтобы увидеть результат.

## Архитектура проекта

Проект состоит из следующих основных компонентов::

- AssetForm: Форма для добавления новых активов.
- AssetList: Список активов с возможностью удаления.
- useBinanceSymbols: Хук для получения символов и цен с Binance.
- useWebSocket: Хук для получения данных в реальном времени через WebSocket.

## Используемые библиотеки

- Next.js: Фреймворк для React-приложений.
- React: Библиотека для создания пользовательских интерфейсов.
- React Hook Form: Библиотека для работы с формами.
- Zod: Библиотека для валидации данных.
- Zustand: Легковесная библиотека для управления состоянием.
- Axios: Библиотека для выполнения HTTP-запросов.
- Radix UI: Набор компонентов для создания пользовательских интерфейсов.
- Tailwind CSS: Утилитарный CSS-фреймворк.
- Lucide React: Иконки для React-приложений.

## Ссылка на GitHub-репозиторий с проектом.

[https://github.com/OksanaZhuravel/overview](https://github.com/OksanaZhuravel/overview)

## Ссылка на развернутое приложение с помощью Vercel.

[https://overview-chi.vercel.app/](https://overview-chi.vercel.app/)
