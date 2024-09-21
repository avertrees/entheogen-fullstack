This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Authentication:
ClerkJS
https://clerk.com/
`https://dashboard.clerk.com/apps/app_2gNm3e8D79Pf0qSqeQl9EFO2Dsw/instances/ins_2gNm3rUxsr2SNEX54eIaH5U7Rc3`

## DB
mysql db hosted on PlanetScale

https://planetscale.com/
https://planetscale.com/features/cli

`brew install planetscale/tap/pscale   `

`pscale auth login`

`pscale connect entheogen dev --port 3309`

## Prisma
ORM for db
https://www.prisma.io/
https://www.prisma.io/docs/orm/reference/prisma-cli-reference 

`npx prisma init`

Finally, once you are ready to push your schema to PlanetScale, run prisma db push against your PlanetScale database to update the schema in your database:

`npx prisma db push`

`npx prisma studio`

    Examples

      Set up a new Prisma project
      $ prisma init

      Generate artifacts (e.g. Prisma Client)
      $ prisma generate

      Browse your data
      $ prisma studio

      Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
      $ prisma migrate dev

      Pull the schema from an existing database, updating the Prisma schema
      $ prisma db pull

      Push the Prisma schema state to the database
      $ prisma db push

      Validate your Prisma schema
      $ prisma validate

      Format your Prisma schema
      $ prisma format

      Display Prisma version info
      $ prisma version

      Display Prisma debug info
      $ prisma debug

## Open AI Chat GPT
  https://platform.openai.com/docs/overview
  https://platform.openai.com/docs/api-reference
  ### Zod
  json schema library // structured output chain

  ### langchain
  js library for interfacing with OpenAI
  https://js.langchain.com/v0.1/docs/get_started/introduction/
  
  #### "Analyze" model

## Vector DB
  in memory vector db

## Tests
https://vitejs.dev/config/
https://vitest.dev/guide/mocking.html
 <!-- @testing-library/jest-dom @testing-library/react vitest @vitejs/plugin-react-swc jsdom --save-dev -->
## API Routes

## Recharts
https://recharts.org/en-US/

## Filestore 
https://firebase.google.com/docs/storage/web/start

## P5.js
https://github.com/P5-wrapper/react


## Acknowledgment
a majority of this code follows the following course on frontend masters 
https://frontendmasters.com/courses/fullstack-app-next-v3/ 
https://github.com/Hendrixer/fullstack-ai-nextjs/tree/main

updates two apps that I made in bootcamp: 
https://github.com/avertrees/entheogen-frontend
https://github.com/avertrees/entheogen-backend
