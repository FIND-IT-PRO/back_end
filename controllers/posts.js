const { ObjectId } = require("mongoose").Types;
const posts = require("../models/posts");
const comments = require("../models/comments");
const StorageController = require("./storage");
const storage = require("./storage");
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
    try {
      const post = await this.collection.create({
        _id: ObjectId(),
        ...data,
      });
      const { images } = post;
      const isImageExists = await storage.validBlobLink(images, "images");
      const { videos } = post;
      const isVideoExists = await storage.validBlobLink(videos, "videos");

      // console.log(data);
      if (!isImageExists || !isVideoExists)
        throw new Error(
          "at least on of the provided links are not genrated with our api or it doesn't exists"
        );
      post.save();
      return post;
    } catch (e) {
      // console.log(e);
      throw e; // throw it to the last handler
    }
  }
  async removePost(id, user_id) {
    // removes the post's images from the azure server
    const post = await this.collection.findOne(
      { _id: ObjectId(id) },
      { images: 1, videos: 1 }
    );
    if (!post) return null;
    // console.log("🚀 ~ file: posts.js:33 ~ Posts ~ removePost ~ post", post);
    const { images } = post;
    // removing image by image
    //! need to be refactore
    images.map(
      async (imgUrl) =>
        await StorageController.removeUploadedFile(imgUrl, "images")
    );
    const { videos } = post;
    // console.log("🚀 ~ file: posts.js:38 ~ Posts ~ removePost ~ videos", videos);
    videos.map(
      async (videoUrl) =>
        await StorageController.removeUploadedFile(videoUrl, "vidoes")
    );
    // removes the comments related to his post
    await this.removePostComments(id, user_id);
    // remove the post it self
    return this.collection.deleteOne({
      _id: ObjectId(id),
      user_id,
    });
  }
  async editPost(postUpdateFileds) {
    console.log(
      "🚀 ~ file: posts.js:70 ~ Posts ~ editPost ~ postUpdateFileds",
      postUpdateFileds
    );
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(postUpdateFileds._id) },
      { $set: postUpdateFileds, "date.lastUpdateDate": new Date() },
      { new: true, runValidators: true }
    );
  }
  async removePostComments(id, user_id) {
    // user_id is the id of the person who comments
    // const postOwner = 1;
    // console.log(id, user_id);
    return this.helperCollection.deleteMany({
      post_id: ObjectId(id),
      user_id,
    });
  }
}
module.exports = new Posts();
