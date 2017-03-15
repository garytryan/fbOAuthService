import auth from './controllers/auth'
import * as user from './controllers/user'
import * as zine from './controllers/zine'

export const configRoutes = router =>
  router
    .post('/auth/signup', auth.signup)
    .get('/auth/logout', auth.logout)
    .get('/user/me', user.me)
    .get('/user', user.get)
    .post('/user', user.post)
    .post('/zine', zine.post)
