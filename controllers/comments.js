const { ObjectId } = require("mongoose").Types;
const comments = require("../models/comments");
class Comments {
  constructor() {
    this.collection = comments; //comments is a collection(model)
  }
  async getCommentsByPostId(id) {
    console.log(id);
    return await this.collection.find({ post_id: ObjectId(id) });
  }
  async createComment(data) {
    const comment = await this.collection.create({
      _id: ObjectId(),
      ...data,
    });
    comment.save();
    return comment;
  }
  // todo AuthGard
  async removeComment(id) {
    return this.collection.deleteOne({ _id: ObjectId(id) });
  }
  async editComment(commentUpdateFileds) {
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(commentUpdateFileds._id) },
      { $set: commentUpdateFileds, "date.lastUpdateDate": new Date() },
      { new: true }
    );
  }
}
module.exports = new Comments();
