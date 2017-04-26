import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  profileImageURL: { type: String, default: '' }
})

UserSchema.methods.toJSON = function() {
	var user = this.toObject()
	user.id = user._id.toString()

	delete user._id
	delete user.password
	delete user.__v
	return user
}

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash
    next()
  })
})

export default mongoose.model('User', UserSchema)
