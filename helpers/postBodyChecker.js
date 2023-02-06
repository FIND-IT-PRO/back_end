module.exports = async function commentBodyChecker(post) {
  if (post.hasOwnProperty("user_id"))
    throw new Error("the body is not as excepted");
};
