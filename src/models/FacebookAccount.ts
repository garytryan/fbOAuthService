const mongoose = require('mongoose')

const FacebookAccountSchema = new mongoose.Schema({
  userId: {type: String, require: true},
  facebookUserId: { type: String, require: true }
})

FacebookAccountSchema.methods.toJSON = function() {
	var facebookAccount = this.toObject()
	facebookAccount.id = facebookAccount._id

	delete facebookAccount._id
	delete facebookAccount.__v
	return facebookAccount
}

export default mongoose.model('FacebookAccount', FacebookAccountSchema)
