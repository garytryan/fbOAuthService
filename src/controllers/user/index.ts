import User from '../../models/User'

export const get = async ctx => {
  ctx.body = await User.find()
}

export const me = async ctx => {
 ctx.body = ctx.user
}

export const post = async ctx => {
  if(!ctx.user.name) return ctx.throw(401, 'unauthorized')

  ctx.body = await User.findOneAndUpdate(
    { _id: ctx.user._id },
    ctx.request.body,
    { new: true })
}
