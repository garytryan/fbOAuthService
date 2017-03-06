import User from '../../models/User'

export default () => async (ctx, next) => {
  if(ctx.session.userId) {
    ctx.user = await User.findById(ctx.session.userId)
  }
  else {
    ctx.user = await User().save()
    ctx.session.userId = ctx.user._id
  }

  await next()
}

export const logout = async ctx => {
  ctx.session = null
}
