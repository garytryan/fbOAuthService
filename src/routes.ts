import auth from './controllers/auth'
import * as user from './controllers/user'
import * as zine from './controllers/zine'
import * as post from './controllers/post'

export const configRoutes = router =>
  router

    // AUTH
    .get('/auth/logout', auth.logout)
    .post('/auth/signup', auth.signup)
    .post('/auth/signin', auth.signin)


    // USER
    .get('/user', user.get)
    .get('/my/user', user.me)
    .post('/user', user.post)


    // ZINE
    .get('/zine', zine.getZine)
    .get('/zines', zine.getZines)
    .get('/my/zines', zine.me)
    .post('/zine', zine.post)
    .del('/zine', zine.del)


    // POST
    .post('/post', post.post)
    .put('/post', post.put)
    .get('/post', post.get)
    .get('/posts', post.getPosts)
    .del('/post', post.del)
