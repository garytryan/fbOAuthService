import User from '../../models/User'
import * as MongoQS from 'mongo-querystring'

const qs = new MongoQS()


export const get = async ctx => {
  ctx.body = await User.find(qs.parse(ctx.query))
}

export const me = async ctx => {
 ctx.body = await ctx.getUser()
}

export const post = async ctx => {
  const user = await ctx.getUser()
  if(!user.name) return ctx.throw(401, 'unauthorized')

  ctx.body = await User.findOneAndUpdate(
    { _id: user._id },
    ctx.request.body,
    { new: true })
}
