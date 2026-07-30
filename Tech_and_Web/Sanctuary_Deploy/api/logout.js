module.exports = function handler(req, res) {
  res.setHeader('Set-Cookie',
    'sanctuary_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
  );
  res.redirect('/login.html');
};
