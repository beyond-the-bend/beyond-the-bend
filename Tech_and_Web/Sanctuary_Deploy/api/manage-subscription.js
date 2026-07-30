const Stripe = require('stripe');
const { SignJWT } = require('jose');
const { jwtVerify } = require('jose');

module.exports = async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Get customer ID from existing cookie if available
  let customerId = null;
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/sanctuary_session=([^;]+)/);
  if (match) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(match[1], secret);
      customerId = payload.customerId;
    } catch (e) { /* invalid cookie, ignore */ }
  }

  if (!customerId) return res.redirect('/signin.html?error=not_found');

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.SITE_URL}/sanctuary.html`,
    });
    res.redirect(303, portalSession.url);
  } catch (error) {
    console.error('Manage subscription error:', error);
    res.redirect('/signin.html?error=server_error');
  }
};
