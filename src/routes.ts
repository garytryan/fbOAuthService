import auth from './controllers/auth'
import user from './controllers/user'

export const configRoutes = router =>
  router
    .post('/auth/signup', auth.signup)
    .get('/auth/logout', auth.logout)
    .get('/user', user.get)
    .get('/user/me', user.me)
