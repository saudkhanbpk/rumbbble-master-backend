const { Schema, model } = require("mongoose");

const User = new Schema({
  name: String,
  picture: String,
  biography: String,
  location: String,
  githubID: Number,
  githubUsername: String,
  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

model("users", User);
