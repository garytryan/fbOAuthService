import * as mongoose from 'mongoose'
import Post from '../../models/Post'
import User from '../../models/User'
import Zine from '../../models/Zine'
import { pick } from 'lodash'

export const post = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')
  ctx.checkBody('title').notBlank()
  ctx.checkBody('body').notBlank()
  ctx.checkBody('zineId').notBlank()

  if(ctx.errors) {
    ctx.throw(
      400,
      'incorrectly formatted request',
      { errors: ctx.errors }
    )
    return
  }


  ctx.request.body.authorId = ctx.loggedInUser.id

  ctx.body = await Post(ctx.request.body).save()
}

export const get = async ctx => {
  ctx.body = await Post.find(ctx.query)
}
