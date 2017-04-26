import { logout } from '../../utils/identity'

export default async ctx => {
  const user = ctx.getUser()

  logout(ctx)

  ctx.body = user
}
