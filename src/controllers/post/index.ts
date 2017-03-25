import * as mongoose from 'mongoose'
import Post from '../../models/Post'
import User from '../../models/User'
import Zine from '../../models/Zine'
import { pick } from 'lodash'

export const post = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')
  ctx.checkBody('type').notBlank()
  ctx.checkBody('contentURL').notBlank()
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
  ctx.checkQuery('zineId').notBlank()

  if(ctx.errors) {
    ctx.throw(
      400,
      'incorrectly formatted request',
      { errors: ctx.errors }
    )
    return
  }

  const posts = await Post.find(ctx.query)

  const authorIds = Array.from(new Set(posts.map(post => mongoose.Types.ObjectId(post.authorId))))
  const zineIds =  Array.from(new Set(posts.map(post => mongoose.Types.ObjectId(post.zineId))))

  const authors = await User.find({ _id: { $in: authorIds } }, { profileImageURL: 1 })
  const zines = await Zine.find({ _id: { $in: zineIds } }, { iconImageURL: 1 })

  ctx.body = posts.map(post => {
    post = post.toJSON()

    post.author = authors.find(author => author.id === post.authorId)
    delete post.authorId

    post.zine = zines.find(zine => zine.id === post.zineId)
    delete post.zineId

    return post
  })
}
