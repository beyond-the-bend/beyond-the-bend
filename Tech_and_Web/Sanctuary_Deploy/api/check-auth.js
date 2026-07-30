const { jwtVerify, SignJWT } = require('jose');
const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/sanctuary_session=([^;]+)/);

  if (!match) return res.status(200).json({ authenticated: false });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(match[1], secret);

    const nowSeconds = Math.floor(Date.now() / 1000);
    const iat = payload.iat || 0;
    
    // Cache the subscription check for 24 hours (86400 seconds)
    if (nowSeconds - iat < 86400) {
      // Extremely fast response - skips Stripe API network call!
      return res.status(200).json({ authenticated: true, email: payload.email });
    }

    // It has been more than 24 hours since the last check. Verify with Stripe:
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const subscriptions = await stripe.subscriptions.list({
      customer: payload.customerId,
      status: 'active',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      // Lapsed subscription: clear cookie and return unauthenticated
      res.setHeader('Set-Cookie',
        'sanctuary_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
      );
      return res.status(200).json({ authenticated: false });
    }

    // Subscription is active: issue a fresh session cookie to extend the cache window
    const freshToken = await new SignJWT({ email: payload.email, customerId: payload.customerId })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('3650d')
      .sign(secret);

    res.setHeader('Set-Cookie',
      `sanctuary_session=${freshToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${3650 * 24 * 60 * 60}`
    );

    res.status(200).json({ authenticated: true, email: payload.email });
  } catch (e) {
    // Clear invalid cookie on error
    res.setHeader('Set-Cookie',
      'sanctuary_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    );
    res.status(200).json({ authenticated: false });
  }
};
