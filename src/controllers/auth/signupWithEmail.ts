import User from '../../models/User'

export default async ctx => {
  ctx.checkBody('email').isEmail()
  ctx.checkBody('name').notBlank()
  ctx.checkBody('password').notBlank()

  if(ctx.errors) {
    ctx.throw(
      400,
      'incorrectly formatted request',
      { errors: ctx.errors }
    )
    return
  }

  ctx.body = await User({
    name: ctx.request.body.name,
    email: ctx.request.body.email,
  }).save()
}
