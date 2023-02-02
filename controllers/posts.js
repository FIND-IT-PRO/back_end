const { ObjectId } = require("mongoose").Types;
const posts = require("../models/posts");
const comments = require("../models/comments");
class Posts {
  constructor() {
    this.collection = posts; //posts is a collection(model)
    this.helperCollection = comments;
  }
  async getPost(id) {
    return await this.collection.findById(id);
  }
  async getPosts(n) {
    return this.collection.aggregate([{ $sample: { size: n } }]); //get randome posts
  }
  async createPost(data) {
    const post = await this.collection.create({
      _id: ObjectId(),
      ...data,
    });
    // console.log(data);
    post.save();
    return post;
  }
  async removePost(id) {
    return this.collection.deleteOne({ _id: ObjectId(id) });
  }
  async editPost(postUpdateFileds) {
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(postUpdateFileds._id) },
      { $set: postUpdateFileds, "date.lastUpdateDate": new Date() },
      { new: true }
    );
  }
  async removePostComments(id) {
    return this.helperCollection.deleteMany({ post_id: ObjectId(id) });
  }
}
module.exports = new Posts();