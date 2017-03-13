import User from '../../models/User'

export const get = async ctx => {
  ctx.body = await User.find()
}

export const me = async ctx => {
 ctx.body = ctx.loggedInUser
}

export const post = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  ctx.body = await User.findOneAndUpdate(
    { _id: ctx.loggedInUser._id },
    ctx.request.body,
    { new: true })
}
