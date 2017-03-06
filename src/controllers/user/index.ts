import User from '../../models/User'

export const get = async ctx => {
  ctx.body = await User.find()
}

export const me = async ctx => {
 ctx.body = ctx.user
}

export default {
  get,
  me
}
