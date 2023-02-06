module.exports = function commentBodyChecker(comment) {
  if (comment.hasOwnProperty("user_id"))
    throw new Error("the body is not as excepted");
};
