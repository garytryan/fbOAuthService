import User from '../../models/User'

export default () => async (ctx, next) => {
  if(ctx.session.loggedInUserId) {
    ctx.loggedInUser = await User.findById(ctx.session.loggedInUserId)
  }
  else if(ctx.session.loggedOutUserId) {
    ctx.loggedOutUser = await User.findById(ctx.session.loggedOutUserId)
  }
  else {
    const newUser = await User().save()
    ctx.session.loggedOutUserId = newUser._id
  }

  await next()
}

export const logout = async ctx => {
  ctx.session.loggedInUserId = null
}

export const login = (ctx, user) => {
  ctx.loggedInUser = user
  ctx.session.loggedInUserId = user._id
}
