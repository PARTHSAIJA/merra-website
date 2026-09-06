# Merra marketing site

Responsive React + Vite recreation based on the supplied Figma-exported design.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Vite outputs the site to `dist/`.

## Deploy with AWS Amplify

1. Create a new GitHub repository, e.g. `merra-website`.
2. Add these files to the repository and push to `main`.
3. In AWS Amplify Hosting choose **GitHub** and connect the repository.
4. Amplify should detect Vite automatically.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.
8. Once verified, attach the Merra custom domain in Amplify.

## Before production

- Replace `hello@merra.com` and `support@merra.com` with the final addresses.
- Replace the CSS-built temporary logo with the official SVG/logo asset if available.
- Wire Login/Product/Demo links to final URLs.
- Add final Privacy Policy page.
- Review mobile/tablet layouts against the original Figma file.
