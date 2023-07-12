This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Folders Structure [`Feature Sliced Design`](https://feature-sliced.design/)

Presentation and slides about [`FSD`](https://docs.google.com/presentation/d/1Ui8Ji8Q6fB_3kkcM9bQxVGYuhhcItZInra8WiUOgnOA/edit#slide=id.g1072b3b2b36_0_22)

`/src` - all needed functionality and components for pages
- `/shared` - reusable functionality, detached from the specifics of the project/business.(e.g. UIKit, libs, API)
- `/layouts` - common layouts for pages
- `/entities` - business entities.(e.g., User, Product, Order)
- `/features` - user interactions, actions that bring business value to the user.(e.g. SendComment, AddToCart, UsersSearch)
- `/widgets` - compositional layer to combine entities and features into meaningful blocks.(e.g. IssuesList, UserProfile)
- `/pages` - application pages
- `/templates` - big parts of pages with building blocks for specific page. For the next.js pages is a file-routed directory, where one component = one route. For FSD pages, this is the flat page list layer. If you want to use both, you will have to keep two directories at once: a flat list of pages (let it be templates) and nested routes (pages). We keep the page code in templates and export it to pages. Ready.
- `/app` - app-wide settings, styles and providers.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
