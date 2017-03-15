import auth from './controllers/auth'
import * as user from './controllers/user'
import * as zine from './controllers/zine'

export const configRoutes = router =>
  router
    .post('/auth/signup', auth.signup)
    .get('/auth/logout', auth.logout)
    .get('/user', user.get)
    .post('/user', user.post)
    .post('/zine', zine.post)
    .get('/zine', zine.getZine)
    .get('/zines', zine.getZines)
    .get('/my/user', user.me)
    .get('/my/zines', zine.me)
