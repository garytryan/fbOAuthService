import User from '../../models/User'

const getUser = async ctx =>
  await User.findById(ctx.session.loggedInUserId || ctx.session.loggedOutUserId)

export default () => async (ctx, next) => {
  const user = await getUser(ctx)

  if(!user) {
    const newUser = await User().save()

    ctx.session.loggedOutUserId = newUser._id
  }

  ctx.getUser = async () => await getUser(ctx)

  await next()
}

export const logout = async ctx => {
  ctx.session.loggedInUserId = null
}

export const login = (ctx, user) => {
  ctx.session.loggedInUserId = user._id
}
