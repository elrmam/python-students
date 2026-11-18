# Kernel Academy Certificates

A responsive React + Vite certificate gallery for Kernel Academy.

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
npm run preview
```

Deploy the generated `dist` folder to Vercel, Netlify, or any static hosting provider.

## Add another certificate

1. Put the certificate image in `public/certificates/`.
2. Add an object to the `certificates` array in `src/main.jsx` with a unique `id`, the exact student `name`, `image` path, `course`, and `date`.

The current gallery uses local image assets and does not require a database or backend. Certificate IDs are display identifiers, not online verification records.
