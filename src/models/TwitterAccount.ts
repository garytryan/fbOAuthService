const mongoose = require('mongoose')

const TwitterAccountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accountId: { type: String },
  oauthToken: { type: String },
  oauthTokenSecret: { type: String },
})

TwitterAccountSchema.methods.toJSON = function() {
	var twitterAccount = this.toObject()
	twitterAccount.id = twitterAccount._id

	delete twitterAccount._id
	delete twitterAccount.__v
	return twitterAccount
}

export default mongoose.model('TwitterAccount', TwitterAccountSchema)
