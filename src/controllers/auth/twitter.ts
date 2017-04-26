import * as request from 'request-promise-native'

import * as qs from 'querystring'
import { login } from '../../utils/identity'
import TwitterAccount from '../../models/TwitterAccount'
import User from '../../models/User'

export const signUp = async ctx => {
  const user = await ctx.getUser()

  // if an account for TwitterAlready exists for this user,
  // login and return the user
  const existingTwitterAccount = await TwitterAccount.findOne({ userId: user._id })

  if(existingTwitterAccount) {
    const existingUser = await User.findById(existingTwitterAccount.userId)

    login(ctx, existingUser)

    return ctx.body = {
      url: '/'
    }
  }

  // fetch an oauth request token from twitter
  const oauthRequestTokenResponse = await request({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      callback: encodeURI(`${ctx.origin}/auth/twitter/callback`),
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET
    }
  })

  const requestToken = qs.parse(oauthRequestTokenResponse)

  ctx.session[`oauthRequestToken::${requestToken.oauth_token}`] = requestToken.oauth_token_secret

  ctx.body = {
      url: `http://api.twitter.com/oauth/authenticate?oauth_token=${requestToken.oauth_token}`
  }
}

export const signIn = async ctx => {

}

export const callback = async ctx => {
  const requestTokenSecret = ctx.session[`oauthRequestToken::${ctx.query.oauth_token}`]
  ctx.session[`oauthRequestToken::${ctx.query.oauth_token}`] = null

  const accessTokenResponse = await request({
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    oauth: {
      token: ctx.query.oauth_token,
      token_secret: requestTokenSecret,
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      verifier: ctx.query.oauth_verifier
    }
  })

  const accessToken = qs.parse(accessTokenResponse)

  const twitterCredentials = await request({
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=false&include_email=true&include_entities=false',
    method: 'GET',
    oauth: {
      token: accessToken.oauth_token,
      token_secret: accessToken.oauth_token_secret,
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET
    },
    qs: { screen_name: accessToken.screen_name, user_id: accessToken.user_id },
    json: true
  })

  const twitterAccount = await TwitterAccount.findOne({ accountId: twitterCredentials.id })

  if(twitterAccount) {
    twitterAccount.update({
      oauthToken: accessToken.oauth_token,
      oauthTokenSecret: accessToken.oauth_token_secret
    })

    const user = await User.findOne({ _id: twitterAccount.userId })

    login(ctx, user)
  }
  else {
    let user = await User.findOne({ email: twitterCredentials.email })

    if(!user) {
      user = await User({
        name: twitterCredentials.name,
        email: twitterCredentials.email,
        profileImageURL: twitterCredentials.profile_image_url
      }).save()
    }

    await TwitterAccount({
      userId: user._id,
      accountId: twitterCredentials.id,
      oauthToken: accessToken.oauth_token,
      oauthTokenSecret: accessToken.oauth_token_secret
    }).save()

    login(ctx, user)
  }



  ctx.redirect(process.env.ZINE_PAGE_SERVER_URL)
}
