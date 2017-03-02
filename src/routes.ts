import auth from './controllers/auth'

export const configRoutes = router =>
  router
    .post('/auth/signup', auth.signup)
