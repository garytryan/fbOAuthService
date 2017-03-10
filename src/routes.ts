import auth from './controllers/auth'
import * as user from './controllers/user'

export const configRoutes = router =>
  router
    .post('/auth/signup', auth.signup)
    .get('/auth/logout', auth.logout)
    .get('/user/me', user.me)
    .get('/user', user.get)
    .post('/user', user.post)
