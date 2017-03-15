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

  const userZineCount = await Zine.count({ ownerId: ctx.loggedInUser._id })

  if(userZineCount > 10) {
    ctx.throw(403, 'cannot own more then 10 zines')
  }


  ctx.body = await Zine.findOneAndUpdate(
    { name: ctx.request.body.name, ownerId: ctx.loggedInUser._id },
    ctx.request.body,
    { new: true, upsert: true })
}

export const getZine = async ctx => {
  ctx.body = await Zine.findOne(ctx.query)
}

export const getZines = async ctx => {
  ctx.body = await Zine.find(ctx.query)
}
