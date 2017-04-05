const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String },
  authorId: { type: String, required: true },
  zineId: { type: String, required: true },
  body: { type: mongoose.Schema.Types.Mixed, required: true },
  deleted: { type: Boolean, default: false }
}, {
  minimize:false
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
