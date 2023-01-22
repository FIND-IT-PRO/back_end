const users = require("../models/users");
class User {
  constructor() {
    this.collection = users; //users is a collection(model)
  }
  async getUser(id) {
    // const test = await this.collection.insertMany([
    //   { username: "users" },
    //   { username: "test" },
    // ]);
    const test = await this.collection.find();
    console.log(test);
    return this.collection.findById(id);
  }
}
module.exports = new User();
