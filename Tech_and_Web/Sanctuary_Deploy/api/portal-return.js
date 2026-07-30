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
      customer: cid,
      status: 'active',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      return res.redirect('/signin.html?error=no_subscription');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ email: customer.email, customerId: cid })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3650d')
      .sign(secret);

    res.setHeader('Set-Cookie',
      `sanctuary_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${3650 * 24 * 60 * 60}`
    );
    res.redirect('/sanctuary.html');
  } catch (error) {
    console.error('Portal return error:', error);
    res.redirect('/login.html');
  }
};
