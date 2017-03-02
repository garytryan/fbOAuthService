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

  ctx.body = {
    name: 'name',
    email: 'email@email.email',
    profileImage: {
      isEmpty: true,
      url: ''
    }
  }
}
