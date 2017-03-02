import facebook from '../../utils/facebook'
import facebookConfig from '../../config/facebook.config'

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

  const accessTokenResponse: any = await facebook.api('oauth/access_token', {
    client_id: facebookConfig.appId,
    client_secret: facebookConfig.secret,
    grant_type: 'client_credentials'
  })

  facebook.setAccessToken(accessTokenResponse.access_token)

  const userAccessTokenInspectionResponse: any = await facebook
    .api('/debug_token',{
      input_token: ctx.request.body.facebookUserAccessToken,
      access_token: accessTokenResponse.access_token
    })

  if(
    userAccessTokenInspectionResponse.data.user_id !==
    ctx.request.body.facebookUserId
  ) ctx.throw(401, 'access token invalid for user')


  const userProfile = await facebook
    .api(ctx.request.body.facebookUserId, {
      fields: 'id,name,picture,email'
    })
}
