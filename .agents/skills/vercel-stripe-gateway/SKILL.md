---
name: vercel-stripe-gateway
description: >-
  Builds a complete zero-monthly-fee payment wall for any Vercel-hosted static
  website using Stripe and JWT session cookies. Produces a login page, sign-in
  page, six Vercel serverless API functions (create-checkout, checkout-success,
  check-auth, signin, portal-return, logout), and a package.json. Protects any
  number of HTML pages with a server-side auth check. Requires a Stripe account
  and a Vercel deployment. No third-party membership platform needed.
---

# Vercel Stripe Gateway

## Overview

This skill builds a fully functional membership payment wall for a static website hosted on Vercel. Members pay through Stripe Checkout, receive a secure 30-day session cookie, and are automatically let into the protected site. Returning members sign in via their email using the Stripe Customer Portal. There is no monthly platform fee beyond Stripe's standard transaction rate.

This pattern was built and tested for The Sanctuary (Beyond the Bend Yoga) and is designed to be reused on any Vercel static site.

---

## Prerequisites

Before starting, confirm the following are in place:

- A Vercel account with the site already deployed
- A standalone Stripe account (NOT a GoHighLevel/LeadConnector connected account)
- The Vercel CLI installed and authenticated on the user's machine
- Node.js available on the user's machine

---

## Inputs Required from User

Before writing any code, collect these from the user:

| Input | How to get it | Example |
|-------|--------------|---------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard > Developers > API Keys > Secret key | `sk_test_51...` |
| Site URL | The live Vercel deployment URL | `https://btb-sanctuary.vercel.app` |
| Product name | What the membership is called | `Sanctuary Member` |
| Price | Monthly price in local currency | `$22 CAD` |
| Currency | ISO currency code | `cad` |
| Pages to protect | List of HTML filenames to lock | `sanctuary.html`, `sanctuary_courses.html` |

The `STRIPE_PRICE_ID` and `JWT_SECRET` are generated during setup, not collected from the user.

---

## Step 1: Create Stripe Product and Price

Run this PowerShell script to create the subscription product in Stripe:

```powershell
$stripeKey = "STRIPE_SECRET_KEY_HERE"
$headers = @{ Authorization = "Bearer $stripeKey" }

# Create product
$productBody = "name=PRODUCT_NAME_HERE&description=Monthly+access+to+SITE_NAME_HERE"
$product = Invoke-RestMethod -Uri "https://api.stripe.com/v1/products" -Method POST -Headers $headers -Body $productBody -ContentType "application/x-www-form-urlencoded"
Write-Host "Product ID: $($product.id)"

# Create monthly price (amount in cents, e.g. 2200 = $22.00)
$priceBody = "unit_amount=AMOUNT_IN_CENTS&currency=CURRENCY_CODE&recurring[interval]=month&product=$($product.id)"
$price = Invoke-RestMethod -Uri "https://api.stripe.com/v1/prices" -Method POST -Headers $headers -Body $priceBody -ContentType "application/x-www-form-urlencoded"
Write-Host "Price ID: $($price.id)"
```

Save the `Price ID` that is returned. It looks like `price_1Abc123...`

---

## Step 2: Generate a JWT Secret

```powershell
$bytes = New-Object System.Byte[] 32
$rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
$rng.GetBytes($bytes)
$hex = ($bytes | ForEach-Object { $_.ToString("x2") }) -join ""
Write-Host $hex
```

Save the output. This is your `JWT_SECRET`.

---

## Step 3: Link the Deploy Folder to Vercel and Set Environment Variables

```powershell
# Link folder (run from the deploy directory)
vercel link --yes --project PROJECT_NAME --scope VERCEL_SCOPE

# Set each variable
"STRIPE_SECRET_KEY_VALUE" | vercel env add STRIPE_SECRET_KEY production --yes
"STRIPE_PRICE_ID_VALUE"   | vercel env add STRIPE_PRICE_ID production --yes
"JWT_SECRET_VALUE"        | vercel env add JWT_SECRET production --yes
"SITE_URL_VALUE"          | vercel env add SITE_URL production --yes
```

---

## Step 4: Create package.json

Create at the root of the deploy folder:

```json
{
  "name": "site-name",
  "version": "1.0.0",
  "dependencies": {
    "stripe": "^16.12.0",
    "jose": "^5.9.6"
  }
}
```

---

## Step 5: Create the API Folder and Functions

Create a folder called `api/` in the deploy directory and add these six files:

### `api/create-checkout.js`
Redirects the visitor to Stripe Checkout for a new subscription.

```javascript
const Stripe = require('stripe');
module.exports = async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.SITE_URL}/api/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/login.html`,
    });
    res.redirect(303, session.url);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).send('Error creating checkout. Please try again.');
  }
};
```

### `api/checkout-success.js`
Verifies the completed Stripe payment, creates a JWT, sets a 30-day cookie, and redirects to the protected dashboard.

```javascript
const Stripe = require('stripe');
const { SignJWT } = require('jose');
module.exports = async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id } = req.query;
  if (!session_id) return res.redirect('/login.html');
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer']
    });
    if (session.status !== 'complete') return res.redirect('/login.html');
    const email = session.customer_email ||
      (session.customer && typeof session.customer === 'object' ? session.customer.email : null);
    const customerId = session.customer && typeof session.customer === 'object'
      ? session.customer.id : session.customer;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email, customerId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);
    res.setHeader('Set-Cookie',
      `sanctuary_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );
    res.redirect('/DASHBOARD_PAGE.html');
  } catch (error) {
    console.error('Checkout success error:', error);
    res.redirect('/login.html');
  }
};
```

### `api/check-auth.js`
Called by protected pages on load. Verifies the JWT cookie server-side and returns `{authenticated: true/false}`.

```javascript
const { jwtVerify } = require('jose');
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/sanctuary_session=([^;]+)/);
  if (!match) return res.status(200).json({ authenticated: false });
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(match[1], secret);
    res.status(200).json({ authenticated: true, email: payload.email });
  } catch (e) {
    res.status(200).json({ authenticated: false });
  }
};
```

### `api/signin.js`
For returning members. Accepts an email via `?email=` query param, verifies active Stripe subscription, and redirects to the Stripe Customer Portal where Stripe sends a magic link.

```javascript
const Stripe = require('stripe');
module.exports = async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const email = req.query.email;
  if (!email) return res.redirect('/signin.html?error=email_required');
  try {
    const customers = await stripe.customers.list({ email: email.trim().toLowerCase(), limit: 1 });
    if (customers.data.length === 0) return res.redirect('/signin.html?error=not_found');
    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id, status: 'active', limit: 1
    });
    if (subscriptions.data.length === 0) return res.redirect('/signin.html?error=no_subscription');
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.SITE_URL}/api/portal-return?cid=${customer.id}`,
    });
    res.redirect(303, portalSession.url);
  } catch (error) {
    console.error('Signin error:', error);
    res.redirect('/signin.html?error=server_error');
  }
};
```

### `api/portal-return.js`
Called when a member returns from the Stripe Customer Portal. Re-verifies their subscription and issues a new session cookie.

```javascript
const Stripe = require('stripe');
const { SignJWT } = require('jose');
module.exports = async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { cid } = req.query;
  if (!cid) return res.redirect('/login.html');
  try {
    const customer = await stripe.customers.retrieve(cid);
    if (customer.deleted) return res.redirect('/login.html');
    const subscriptions = await stripe.subscriptions.list({
      customer: cid, status: 'active', limit: 1
    });
    if (subscriptions.data.length === 0) return res.redirect('/signin.html?error=no_subscription');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email: customer.email, customerId: cid })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);
    res.setHeader('Set-Cookie',
      `sanctuary_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );
    res.redirect('/DASHBOARD_PAGE.html');
  } catch (error) {
    console.error('Portal return error:', error);
    res.redirect('/login.html');
  }
};
```

### `api/logout.js`
Clears the session cookie and redirects to the login page.

```javascript
module.exports = function handler(req, res) {
  res.setHeader('Set-Cookie',
    'sanctuary_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
  );
  res.redirect('/login.html');
};
```

---

## Step 6: Add Auth Check to Protected Pages

Add this snippet inside `<head>` on every page that should be behind the payment wall. Replace any previous Memberstack or platform-specific auth code.

```html
<!-- Auth Check -->
<style id="auth-hide">body{visibility:hidden}</style>
<script>
(function() {
    fetch('/api/check-auth', { credentials: 'same-origin' })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.authenticated) {
                var s = document.getElementById('auth-hide');
                if (s) s.parentNode.removeChild(s);
            } else {
                window.location.href = '/login.html';
            }
        })
        .catch(function() {
            window.location.href = '/login.html';
        });
})();
</script>
```

---

## Step 7: Create login.html and signin.html

**login.html** should have:
- Site logo and branding
- "Join" button linked to `/api/create-checkout`
- "Sign In" button linked to `/signin.html`
- No JavaScript membership library required

**signin.html** should have:
- An email input form with `method="get"` and `action="/api/signin"`
- Error message display based on `?error=` query param values:
  - `email_required` - Please enter your email address
  - `not_found` - No membership found for that email
  - `no_subscription` - Membership may have lapsed
  - `server_error` - Something went wrong, please try again

---

## Step 8: Deploy

```powershell
vercel "PATH_TO_DEPLOY_FOLDER" --yes --project PROJECT_NAME --prod
```

---

## Going Live (Switching from Test to Live Mode)

When ready to accept real payments:

1. In Stripe, flip from **Test Mode** to **Live Mode**
2. Copy the live secret key (`sk_live_...`)
3. Run the product/price creation script again using the live key (Step 1)
4. Update Vercel environment variables:
   ```powershell
   vercel env rm STRIPE_SECRET_KEY production --yes
   vercel env rm STRIPE_PRICE_ID production --yes
   "sk_live_..." | vercel env add STRIPE_SECRET_KEY production --yes
   "price_live_..." | vercel env add STRIPE_PRICE_ID production --yes
   ```
5. Redeploy

---

## Optional: Kit (ConvertKit) Welcome Email Integration

Add the following to `api/checkout-success.js` after verifying the session and before setting the cookie, to automatically subscribe new members to a Kit welcome sequence:

```javascript
// Add to checkout-success.js after confirming session.status === 'complete'
// Requires KIT_API_KEY and KIT_FORM_ID in Vercel environment variables
try {
  await fetch(`https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.KIT_API_KEY,
      email: email,
    })
  });
} catch (kitError) {
  console.error('Kit subscribe error (non-fatal):', kitError);
  // Do not block access if Kit call fails
}
```

Add these two environment variables in Vercel:
- `KIT_API_KEY` - From Kit Dashboard > Settings > Developer
- `KIT_FORM_ID` - The numeric ID of the welcome form/sequence in Kit

---

## Cookie Name Note

The cookie is named `sanctuary_session`. If reusing this pattern for a different site, rename it to something meaningful (e.g. `studio_session`, `members_session`) to avoid conflicts if multiple sites share a domain.

---

## Common Mistakes

1. **Using a GoHighLevel/LeadConnector Stripe account** - Always use a standalone Stripe account. GoHighLevel connected accounts have restricted API access.
2. **Forgetting to link the deploy folder** before setting env vars - Run `vercel link` first.
3. **Using the test price ID in live mode** - Stripe test and live price IDs are separate. Re-run the product creation script in live mode to get a live price ID.
4. **Memberstack script left in pages** - Remove any `data-memberstack-app` script tags before deploying. They will conflict with the custom auth.
