const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  profileImageURL: { type: String, default: '' }
})

UserSchema.methods.toJSON = function() {
	var user = this.toObject()
	user.id = user._id

	delete user._id
	delete user.__v
	return user
}

export default mongoose.model('User', UserSchema)
