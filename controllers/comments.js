const { ObjectId } = require("mongoose").Types;
const comments = require("../models/comments");
const posts = require("../models/posts");

class Comments {
  constructor() {
    this.collection = comments; //comments is a collection(model)
    this.helperCollection = posts; //comments is a collection(model)
  }
  async getCommentsByPostId(id) {
    console.log(id);
    return await this.collection.find({ post_id: ObjectId(id) });
  }
  async createComment(data) {
    const { post_id } = data;
    const post = await this.helperCollection.findOne(
      { _id: post_id },
      { _id: 1 }
    );
    if (!post) throw new Error("there is not post with this id ");
    const parent_comment = await this.collection.findOne(
      {
        _id: data.parent_id,
      },
      { _id: 1 }
    );
    if (!parent_comment)
      throw new Error("thre is not parent post with this id");
    const comment = await this.collection.create({
      ...data,
      _id: new ObjectId(),
    });
    comment.save();
    return comment;
  }
  // todo AuthGard
  async removeComment({ id, user_id }) {
    //  bringing the comment
    const comment = await this.collection.findOne(
      { _id: ObjectId(id) },
      { post_id: 1, user_id: 1, _id: 0 }
    );
    // if the comment doesn't exist
    if (!comment) return null;
    const { user_id: commenter_user_id } = comment;
    //  if i am who comment
    if (ObjectId(commenter_user_id).valueOf() === user_id)
      return await this.collection.deleteOne({ _id: ObjectId(id) });
    // if the post who has this comment belong to me
    const { post_id } = comment;
    // check if the user_id (owner) of this post is the same user with the user_id
    const post = await this.helperCollection.findOne(
      { _id: post_id },
      { user_id: 1, _id: 0 }
    ); // this user the owner of the post who has the comment we wan to delete
    if (!post) return null; // that shouldn't happend because it means we are deleting a comment to a post that doesn't exists
    const { user_id: owner_id } = post;
    if (owner_id === ObjectId(user_id).valueOf())
      return await this.collection.deleteOne({ _id: ObjectId(id) }); // the posts belongs to his owner
    // delete also the comments that point the deleted comments
    await this.collection.deleteMany({ parent_id: id });
    throw new Error("Unhandled case");
  }
  async editComment(commentUpdateFileds, user_id) {
    return this.collection.findOneAndUpdate(
      { _id: ObjectId(commentUpdateFileds._id), user_id },
      { $set: commentUpdateFileds, "date.lastUpdateDate": new Date() },
      { new: true, runValidators: true }
    );
  }
}
module.exports = new Comments();
