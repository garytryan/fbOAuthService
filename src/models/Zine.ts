const mongoose = require('mongoose')


const ZineSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: ''},
  categories: { type: String, default: '' },
  iconImageURL: { type: String, default: '' },
  published: { type: Boolean, default: false }
})

ZineSchema.methods.toJSON = function() {
	var zine = this.toObject()
	zine.id = zine._id

	delete zine._id
	delete zine.__v
	return zine
}

export default mongoose.model('Zine', ZineSchema)
