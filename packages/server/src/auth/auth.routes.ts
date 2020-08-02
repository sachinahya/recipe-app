import { Router } from 'express';
import passport from 'passport';

import { AuthStrategies } from './strategies';

const router = Router();

router.get('/google', (req, res, next) => {
  const returnUrl = typeof req.query.returnUrl == 'string' ? req.query.returnUrl : undefined;

  passport.authenticate(AuthStrategies.Google, {
    scope: ['openid', 'profile', 'email'],
    state: returnUrl,
  })(req, res, next);
});

router.get(
  '/callback',
  passport.authenticate(AuthStrategies.Google /*  { failureRedirect: '/login' } */),
  (req, res) => {
    const returnUrl = typeof req.query.state == 'string' ? req.query.state : undefined;

    // Successful authentication, redirect to the return URL supplied by the application.
    res.redirect(returnUrl || '/');
  }
);

export default router;
