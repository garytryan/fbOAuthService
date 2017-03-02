export default async ctx =>
  ctx.validate = () => {
    if(ctx.errors) {
      ctx.throw(
        400,
        'incorrectly formatted request',
        { errors: ctx.errors }
      )
      return
    }
  }
