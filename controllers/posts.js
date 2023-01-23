const { ObjectId } = require("mongoose").Types;
const posts = require("../models/posts");
class Posts {
  constructor() {
    this.collection = posts; //posts is a collection(model)
  }
  async getPost(id) {
    const test = await this.collection.findById(id);
    console.log("🚀 ~ file: posts.js:8 ~ Posts ~ getPost ~ test", test);
    return test;
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
}
module.exports = new Posts();
