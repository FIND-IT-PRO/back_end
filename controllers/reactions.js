const { ObjectId } = require("mongoose").Types;
const reactions = require("../models/reactions");
const posts = require("../models/posts");
const comments = require("../models/comments");

class Reactions {
  constructor() {
    this.collection = reactions; //reactions is a collection(model)
    this.posts = posts; //reactions is a collection(model)
    this.comments = comments; //reactions is a collection(model)
  }
  async createReaction({ item_id, item_type, reaction_type, user_id }) {
    if (!["posts", "comments"].includes(item_type))
      throw new Error("item type is not supported");
    //

    // check if the user is already react to the item (Post or Comment)
    const isAlreadyReacted = await this.collection.findOne(
      {
        user_id,
        item_id,
      },
      { _id: 1 }
    );
    // console.log(isAlreadyReacted);
    if (isAlreadyReacted)
      throw new Error("you are already reacted to this item");

    // increment the reactions in the item
    const item = await this[item_type].updateOne(
      { _id: ObjectId(item_id), "reactions.reaction_type": reaction_type },
      {
        $inc: {
          "reactions.$.reaction_count": 1,
        },
      }
    );

    // check if it exists
    if (!item.matchedCount) throw new Error("No item found with this id");
    const newReaction = await (
      await this.collection.create({
        _id: ObjectId(),
        item_id,
        item_type,
        reaction_type,
        user_id,
      })
    ).save();

    return newReaction;
  }

  async removeReaction({ id, user_id }) {
    const item = await this.collection.findById(id);
    // console.log(
    //   "🚀 ~ file: reactions.js:39 ~ Reactions ~ removeReaction ~ item",
    //   item
    // );
    if (!item) throw new Error("reaction doesn't exists");
    const { reaction_type, item_type, item_id } = item;

    await this[item_type].updateOne(
      { _id: ObjectId(item_id), "reactions.reaction_type": reaction_type },
      {
        $inc: {
          "reactions.$.reaction_count": -1,
        },
      }
    );
    const deletedReaction = this.collection.deleteOne({
      _id: ObjectId(id),
      user_id: ObjectId(user_id),
    });
    return deletedReaction;
  }
  async editReaction(_id, user_id, reaction_type) {
    const reaction = this.collection.findOneAndUpdate(
      { _id: ObjectId(_id), user_id },
      { $set: { reaction_type } },
      { new: true, runValidators: true }
    );
    return reaction;
  }
}
module.exports = new Reactions();
