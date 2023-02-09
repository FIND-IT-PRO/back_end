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
  async createReaction(reaction) {
    const { item_id } = reaction;
    const { item_type } = reaction;
    const { reaction_type } = reaction;
    if (!["posts", "comments"].includes(item_type))
      throw new Error("item type is not supported");
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
      await this.collection.create({ _id: ObjectId(), ...reaction })
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
