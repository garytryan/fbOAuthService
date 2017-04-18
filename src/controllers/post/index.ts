import * as mongoose from 'mongoose'
import Post from '../../models/Post'
import User from '../../models/User'
import Zine from '../../models/Zine'
import { pick, assign } from 'lodash'

export const getPosts = async ctx => {
  const options = {
    sort: { '_id' : -1 },
    limit: 100
  }

  ctx.body = await Post.find(ctx.query, {}, options)
}

export const get = async ctx => {
  ctx.body = await Post.findOne(ctx.query)
}

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

export const put = async ctx => {
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

  ctx.body = ctx.request.body.id ?
    await Post.findOneAndUpdate(
      { _id: ctx.request.body.id },
      ctx.request.body,
      { new: true }
    ) :
    await Post(ctx.request.body).save()
}

export const del = async ctx => {
  if(!ctx.loggedInUser) return ctx.throw(401, 'unauthorized')
  ctx.checkQuery('id').notBlank()

  const post = await Post.findOne(ctx.query)
  const zine = await Zine.find({ _id: post.zineId })

  if(zine.ownerId === ctx.loggedInUser.id) return ctx.throw(401, 'unauthorized')

  post.deleted = true
  ctx.body = await post.save()
}
