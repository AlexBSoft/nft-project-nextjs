# NFT веб приложуха

## Что нужно знать

Проект построен на библиотеке NextJS - Это React со встроенным бэкендом. За внешний вид отвечает библиотека TailwindCSS. Для базы данных используется сервис Supabase - это база данных PostgreSQL в облаке, бэкенд к ней подключается.


### Как верстать?

Чтобы добавить что-то на страницу, например кнопку, нужно сначала посмотреть компоненты [https://daisyui.com/components/button/](https://daisyui.com/components/button/), можно просто скопировать код оттуда и готово! Весь сайт так и сверстан из готовых компонентов.

### Как добавить страницу?

NextJS 13 имеет встроенный роутер, страницы находятся в директории `app`. Чтобы добавть страницу _chicken_ надо создать файл `app/chicken/page.tsx` и там сделать описать страницу.

Страницы NextJS немного отличаются от страниц стандартного React, а именно, что нельзя использовать все функции, так как страницы по умолчанию - _серверные_ . Если случаются непонятные ошибки на новой странцие, проверь, не используешь ли ты клиентские функции. Если используешь, то просто создай отдельный компонент, в началае файла напиши `'use client';` и подключи его на страницу.

## TODO

Задания по проекту

- [ ] На главной странице проверять вошел ли пользователь в аккаунт. Если не вошел, то вместо кнопки "Создать NFT" - показать кнопку "Войти" - которая должна вести на страницу /login. Сделать по аналогии с кнопками войти/выйти в компоненте "Navbar.tsx"
- [ ] Сделать компонент Footer, вынести туда надпись "Создано в Таганроге" и добавить его на каждую страницу
- [ ] Сделать красивую страницу NFT - `nft/[id]/page.tsx` используя компоненты https://daisyui.com/components/
- [ ] Создать отдельный компонент карточки NFT `NftCard.tsx` и подключить его на страницах `app/page.tsx` и `profile/[id]/page.tsx`. В этот компонент передавать объект NFT из базы.
- [ ] В `NftCard.tsx` делать цвет тени ("shadow") в зависимости от цвета, который указан в NFT при создании
- [ ] На странице `nft/[id]/page.tsx` сделать обработку случая, когда NFT в базе не найден (возможно указан рандомный id) -- просто проверять что `nft[0]` не false. Если NFT не найден, то выводить сообщение о том, что он не найден.
- [ ] Сделать красивую страницу входа/регистрации. Может даже разделить её на 2 страницы.

# Supabase Starter

This starter configures Supabase Auth to use cookies, making the user's session available throughout the entire Next.js app - Client Components, Server Components, Route Handlers, Server Actions and Middleware.

## Deploy your own

The Vercel deployment will guide you through creating a Supabase account and project. After installation of the Supabase integration, all relevant environment variables will be set up so that the project is usable immediately after deployment 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv)

## How to use

1. Create a [new Supabase project](https://database.new)
1. Run `npx create-next-app -e with-supabase` to create a Next.js app using the Supabase Starter template
1. Use `cd` to change into the app's directory
1. Run `npm install` to install dependencies
1. Rename `.env.local.example` to `.env.local` and update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
1. Run `npm run dev` to start the local development server

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

### Create a Supabase client

Check out the [`/app/_examples`](./app/_examples/) folder for an example of creating a Supabase client in:

- [Client Components](./app/_examples/client-component/page.tsx)
- [Server Components](./app/_examples/server-component/page.tsx)
- [Route Handlers](./app/_examples/route-handler/route.ts)
- [Server Actions](./app/_examples/server-action/page.tsx)

### Create `todo` table and seed with data (optional)

Navigate to [your project's SQL Editor](https://app.supabase.com/project/_/sql), click `New query`, paste the contents of the [init.sql](./supabase/migrations/20230618024722_init.sql) file and click `RUN`.

This will create a basic `todos` table, enable Row Level Security (RLS), and write RLS policies enabling `select` and `insert` actions for `authenticated` users.

To seed your `todos` table with some dummy data, run the contents of the [seed.sql](./supabase/seed.sql) file.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js Auth Helpers Docs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
