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
      .setExpirationTime('3650d')
      .sign(secret);

    // Add new member to MailerLite group (non-fatal if it fails).
    try {
      if (process.env.MAILERLITE_API_KEY && email) {
        const groups = process.env.MAILERLITE_GROUP_ID ? [process.env.MAILERLITE_GROUP_ID] : undefined;
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            groups: groups
          })
        });

        if (!response.ok) {
          const body = await response.text();
          console.error('MailerLite subscribe error (non-fatal):', response.status, body);
        }
      } else {
        console.warn('MailerLite subscribe skipped: missing MAILERLITE_API_KEY or email.');
      }
    } catch (mailerLiteError) {
      console.error('MailerLite subscribe error (non-fatal):', mailerLiteError);
    }

    res.setHeader('Set-Cookie',
      `sanctuary_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${3650 * 24 * 60 * 60}`
    );
    res.redirect('/sanctuary.html');
  } catch (error) {
    console.error('Checkout success error:', error);
    res.redirect('/login.html');
  }
};
