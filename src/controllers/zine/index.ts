import Zine from '../../models/Zine'

export const post = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  ctx.body = await Zine.findOneAndUpdate(
    { name: ctx.request.body.name, ownerId: ctx.loggedInUser._id},
    ctx.request.body,
    { new: true, upsert: true })
}
