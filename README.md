# Storm Chasing Holiday

A hostable React countdown website for the Texas and Oklahoma storm chasing trip.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deploy Option: Netlify

This repo includes `netlify.toml`, so Netlify can build and publish the site automatically.

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site** then **Import an existing project**.
3. Select the repository.
4. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy.

The countdown settings are saved in each visitor's browser with `localStorage`, so changing them in the UI does not require a redeploy.

This is intentionally a static, client-only application: settings do not sync
between browsers or devices, and clearing browser storage restores repository
defaults. The project has no configured lint or automated test command; use
`npm run build` as the supported source/configuration gate and exercise changed
UI flows in a real browser when applicable.

Read [AGENTS.md](AGENTS.md), [CODING_STANDARDS.md](CODING_STANDARDS.md), and the
[decision registry](docs/decisions/README.md) before making changes.
