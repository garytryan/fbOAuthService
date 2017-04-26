import auth from './controllers/auth'
import * as user from './controllers/user'
import * as zine from './controllers/zine'
import * as post from './controllers/post'

export const configRoutes = router =>
  router

    // AUTH
    .get('/auth/logout', auth.logout)
    .post('/auth/signup/twitter', auth.twitter.signUp)
    .post('/auth/signup/facebook', auth.facebook.signUp)
    .post('/auth/signup/email', auth.email.signUp)
    .post('/auth/signin/twitter', auth.twitter.signIn)
    .post('/auth/signin/facebook', auth.facebook.signIn)
    .post('/auth/signin/email', auth.email.signIn)
    .get('/auth/twitter/callback', auth.twitter.callback)


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
