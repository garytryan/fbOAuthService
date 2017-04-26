import * as bcrypt from 'bcrypt'
import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  profileImageURL: { type: String, default: '' }
})

UserSchema.methods.toJSON = function() {
	const user = this.toObject()
	user.id = user._id.toString()

	delete user._id
	delete user.password
	delete user.__v
	return user
}

UserSchema.methods.isLoggedIn = function (ctx) {
   return this._id === ctx.session.loggedInUserId
}

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password)
}

UserSchema.methods.serialize = function (ctx) {
  const user = this.toJSON()
  user.loggedIn = this.isLoggedIn(ctx)

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
