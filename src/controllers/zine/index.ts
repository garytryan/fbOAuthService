import Zine from '../../models/Zine'

export const me = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  ctx.query.ownerId = ctx.loggedInUser._id

  ctx.body = await Zine.find(ctx.query)
}

export const post = async ctx => {
  ctx.checkBody('name').notBlank()
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  ctx.request.body.ownerId = ctx.loggedInUser._id

  const existingZineByName = await Zine.findOne({ name: ctx.request.body.name })


  // Updating existing zine
  if(ctx.request.body.id) {
    // if a zine by that name exists
    if(existingZineByName) {
      // and it is the same zine
      // and the user owns it
      if(
        existingZineByName.id === ctx.request.body.id &&
        existingZineByName.ownerId === ctx.loggedInUser.id
      ) {
        return ctx.body = await Zine.findOneAndUpdate(
          { _id: ctx.request.body.id, ownerId: ctx.loggedInUser._id },
          ctx.request.body,
          { new: true })
      } else {
        ctx.throw(403, 'a zine by this name already exists')
      }

    }
    // if a zine by that name doesn't exist
    else {
      // update the zine
      return ctx.body = await Zine.findOneAndUpdate(
        { _id: ctx.request.body.id, ownerId: ctx.loggedInUser._id },
        ctx.request.body,
        { new: true })
    }
  }


  // creating a new zine
  else {
    if(existingZineByName) ctx.throw(403, 'a zine by this name already exists')

    const userZineCount = await Zine.count({
      ownerId: ctx.loggedInUser._id,
      deleted: false
    })

    if(userZineCount > 10) {
      ctx.throw(403, 'cannot own more then 10 zines')
    }


    ctx.body = await Zine.findOneAndUpdate(
      { name: ctx.request.body.name, ownerId: ctx.loggedInUser._id },
      ctx.request.body,
      { new: true, upsert: true })
  }

}

export const getZine = async ctx => {
  ctx.body = await Zine.findOne(ctx.query)
}

export const getZines = async ctx => {
  ctx.body = await Zine.find(ctx.query)
}

export const del = async ctx => {
  ctx.checkQuery('id').notBlank()
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')

  return ctx.body = await Zine.findOneAndUpdate(
    { _id: ctx.query.id, ownerId: ctx.loggedInUser._id },
    { deleted: true },
    { new: true })
}
