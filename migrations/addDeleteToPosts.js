const Post = require('../bin/src/models/Post').default

exports.start = async () => {
  console.log('updating posts')
  await Post.update({}, { deleted: false }, { multi: true })
  console.log('posts updated')
}
