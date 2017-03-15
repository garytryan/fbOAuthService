import Zine from '../../models/Zine'

export const me = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  ctx.body = await Zine.find({ ownerId: ctx.loggedInUser._id })
}

export const post = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  ctx.request.body.ownerId = ctx.loggedInUser._id

  const existingZine = await Zine.findOne({ name: ctx.request.body.name })

  if(existingZine && ctx.request.body.id !== existingZine.id) {
    ctx.throw(403, 'a zine by this name already exists')
  }


  ctx.body = await Zine.findOneAndUpdate(
    { name: ctx.request.body.name, ownerId: ctx.loggedInUser._id },
    ctx.request.body,
    { new: true, upsert: true })
}

export const get = async ctx => {
  ctx.body = await Zine.findOne(ctx.query)
}
