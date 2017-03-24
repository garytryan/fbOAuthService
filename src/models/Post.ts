const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  authorId: { type: String, required: true },
  zineId: { type: String, required: true },
  contentURL: { type: String, required: true }
})

PostSchema.methods.toJSON = function() {
	var post = this.toObject()
	post.id = post._id
  post.createdAt = post.id.getTimestamp()

	delete post._id
	delete post.__v
	return post
}

export default mongoose.model('Post', PostSchema)
