import facebook from '../../utils/facebook'
import facebookConfig from '../../config/facebook.config'
import User from '../../models/User'
import FacebookAccount from '../../models/FacebookAccount'
import { login } from '../../utils/identity'


export default async ctx => {
  ctx.checkBody('facebookUserAccessToken').notBlank()
  ctx.checkBody('facebookUserId').notBlank()

  if(ctx.errors) {
    ctx.throw(
      400,
      'incorrectly formatted request',
      { errors: ctx.errors }
    )
    return
  }

  if(ctx.session.loggedInUserId) {
    return ctx.body = ctx.loggedInUser
  }

  const existingFacebookAccount = await FacebookAccount.findOne({
    facebookUserId: ctx.request.body.facebookUserId
  })

  if(existingFacebookAccount) {
    const existingUser = await User.findById(existingFacebookAccount.userId)

    login(ctx, existingUser)

    return ctx.body = ctx.loggedInUser
  }

  const accessTokenResponse: any = await facebook.api('oauth/access_token', {
    client_id: facebookConfig.appId,
    client_secret: facebookConfig.secret,
    grant_type: 'client_credentials'
  })

  facebook.setAccessToken(accessTokenResponse.access_token)

  const userAccessTokenInspectionResponse:any = await facebook
    .api('/debug_token',{
      input_token: ctx.request.body.facebookUserAccessToken,
      access_token: accessTokenResponse.access_token
    })

  if(
    userAccessTokenInspectionResponse.data.user_id !==
    ctx.request.body.facebookUserId
  ) return ctx.throw(401, 'access token invalid for user')


  const userProfile:any = await facebook
    .api(ctx.request.body.facebookUserId, {
      fields: 'id,name,picture,email'
    })

  const user = await User({
    name: userProfile.name,
    email: userProfile.email,
    profileImageURL: userProfile.picture.data.is_silhouette ? '' : userProfile.picture.data.url
  }).save()

  await FacebookAccount({
    userId: user.id,
    facebookUserId: userProfile.id
  }).save()

  login(ctx, user)

  ctx.body = ctx.loggedInUser
}
