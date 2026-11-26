# KAPLAG · UP Mindanao Student Portal

## Run locally

```sh
npm ci
npm run dev
```

## GitHub Pages

The `Deploy KAPLAG to GitHub Pages` workflow builds and publishes the app to
`https://banz-code.github.io/Test-Exam/` whenever a commit is pushed to `main`.
The workflow can also be started manually from the repository's Actions tab.

The workflow attempts to enable Pages automatically. If repository policy
prevents that, set **Settings → Pages → Build and deployment → Source** to
**GitHub Actions**. The build uses the `/Test-Exam/` base path and includes a
404 fallback for client-side routes.
