export default app => async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error) {
       ctx.status = error.status || 500
       ctx.message =  error.message || ''
       app.emit('error', error, ctx)
       return
    }

    ctx.status = 404
    ctx.body = { message: 'not found' }
  }
}
