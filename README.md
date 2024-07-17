# Next Auth Vercel Boilerplate

This a boilerplate providing registration and login with credentials and google provider. It uses the next-auth package as well as vercel's postgres storage to save users. It is styled with tailwindcss. It uses the app router in [Next.js](https://nextjs.org/) and is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, you'll need to configure the Vercel project with the proper .env variables. To get started, fork this project and [follow this guide](https://nextjs.org/learn/dashboard-app/setting-up-your-database#connect-and-deploy-your-project) for setting up the database in Vercel.

You'll also need to set up Google credentials for a new project through the Google cloud console, placing the following environment variables in your .env file:

```bash
GOOGLE_ID=
GOOGLE_SECRET=
```

For next-auth, you also need to generate a secret key to encrypt JWTs. I use openssl for this:

```bash
openssl rand -hex 32
```

And place it in your .env file.

```bash
AUTH_SECRET=
```

Then, install dependencies and run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
