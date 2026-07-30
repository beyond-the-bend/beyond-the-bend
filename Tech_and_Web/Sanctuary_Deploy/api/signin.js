const Stripe = require('stripe');
const { SignJWT } = require('jose');

module.exports = async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const email = req.query.email;

  if (!email) {
    return res.redirect('/signin.html?error=email_required');
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const customers = await stripe.customers.list({ email: normalizedEmail, limit: 1 });

    if (customers.data.length === 0) {
      return res.redirect('/signin.html?error=not_found');
    }

    const customer = customers.data[0];

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      return res.redirect('/signin.html?error=no_subscription');
    }

    // Active subscription found: issue 10-year session cookie.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email: customer.email, customerId: customer.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3650d')
      .sign(secret);

    res.setHeader('Set-Cookie',
      `sanctuary_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${3650 * 24 * 60 * 60}`
    );
    res.redirect('/sanctuary.html');
  } catch (error) {
    console.error('Signin error:', error);
    res.redirect('/signin.html?error=server_error');
  }
};
