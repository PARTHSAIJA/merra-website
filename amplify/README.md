# Merra backend (Amplify Gen 2)

This adds a real backend to the site — auth, a database, and a Lambda
function — without touching the existing marketing pages. It ships as
**code only**: nothing is provisioned in AWS yet. This sandbox has no AWS
credentials, so the steps below are what you (or whoever owns the AWS
account) need to run once to bring it live.

## What's here

- **Auth** (`amplify/auth`) — a Cognito User Pool, email/password sign-in,
  no self-signup. You create each admin's login yourself; everyone who has
  an account gets full access (no roles/permissions tiers).
- **Data** (`amplify/data`) — an AppSync GraphQL API + DynamoDB table:
  - `Page` — the content the page builder creates (blog posts / landing
    pages). Public visitors can read only `PUBLISHED` pages; only signed-in
    admins can create/edit/delete.
  - `getAnalyticsSummary` — a custom query, admin-only, backed by the
    `ga-analytics` function below.
- **Function** (`amplify/functions/ga-analytics`) — calls the Google
  Analytics 4 Data API and returns KPIs, a daily trend, top pages, and
  traffic sources to the dashboard.

## Frontend pieces this backend powers

- `/admin` (`admin.html` → `src/admin/`) — login, an Analytics dashboard,
  and the Pages list/builder. Not linked from the public site; only
  reachable by URL.
- `/blog/<slug>` (`blog.html` → `src/blog/`) — renders one published page
  built in the admin. `/blog/` with no slug lists all published pages.
  Also not linked from Home/Privacy/Terms/Support — add a link from the
  Footer yourself later if you want it discoverable; nothing here touches
  the existing site files.

Home, Privacy, Terms, and Support are untouched and don't go through this
backend at all — they stay static, exactly as they are.

## One-time AWS setup

1. **Connect the backend in Amplify Hosting.** Since this app already
   exists as a Hosting app connected to GitHub, Amplify auto-detects the
   `amplify/` folder on the next push to this branch and deploys the
   backend (Cognito, AppSync, DynamoDB, Lambda) before the frontend build,
   per `amplify.yml`. If it doesn't pick this up automatically, in the
   Amplify Console open the app → make sure the branch shows a **Backend
   environment** (not just Hosting) — if not, use **"Enable Gen 2 backend"**
   for the branch, or reconnect it as a full-stack app.
2. **Grant the app's backend build role permission to deploy.** Amplify
   normally creates/attaches this automatically the first time it sees
   `amplify/backend.ts`. If the backend build phase fails with an IAM/
   permissions error, Amplify Console will link you straight to creating
   the right service role — accept that prompt.
3. **Set the Google Analytics secrets** on that branch's backend
   environment (Amplify Console → your app → the branch → **Secrets**, or
   from your machine with the AWS CLI configured: `npx ampx sandbox secret
   set GA_PROPERTY_ID` / `GA_SERVICE_ACCOUNT_KEY` for a local sandbox, or
   the Console for the deployed branch):
   - `GA_PROPERTY_ID` — the numeric GA4 property ID (Admin → Property
     details in Google Analytics).
   - `GA_SERVICE_ACCOUNT_KEY` — the full JSON key of a Google Cloud service
     account. Create one in GCP Console → IAM & Admin → Service Accounts →
     Create → generate a JSON key, then in Google Analytics add that
     service account's email as a **Viewer** on the GA4 property (Admin →
     Property access management). Paste the entire JSON file content as
     the secret value.

   The dashboard will show "Couldn't load analytics" with the reason until
   both secrets are set — that's expected, not a bug.
4. **Create admin logins.** There's no sign-up form on purpose. In AWS
   Console → Cognito → User pools → (the pool this backend created) →
   Users → **Create user**, set an email + temporary password, and share it
   with whoever needs access. They'll be asked to set a new password on
   first sign-in at `/admin`.
5. **Add two rewrite rules** in Amplify Hosting → your app → **Rewrites and
   redirects** (same screen you already used for the `www` redirect), both
   as **200 (Rewrite)**, placed *above* the existing catch-all
   `/<*> → /index.html` rule:

   | Source | Target | Type |
   |---|---|---|
   | `/admin` | `/admin.html` | 200 (Rewrite) |
   | `/blog/<*>` | `/blog.html` | 200 (Rewrite) |

   Without these, `/admin` and `/blog/anything` will fall through to the
   marketing homepage instead of loading the right app.

Once all five steps are done, push to this branch (or just merge this
change) and the next deploy brings the whole thing live.

## Local development

```
npx ampx sandbox        # provisions a personal dev copy of the backend in your AWS account
npm run dev              # in another terminal — visit /admin.html and /blog.html
```

`ampx sandbox` needs AWS credentials configured on your machine (`aws
configure` or an SSO profile). It writes `amplify_outputs.json` to the
project root; the admin/blog apps fetch it at runtime, so nothing needs
rebuilding when the backend changes.
