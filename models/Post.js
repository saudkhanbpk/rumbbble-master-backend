const { Schema, model } = require("mongoose");

const Post = new Schema(
  {
    title: String,
    description: String,
    repoURL: String,
    demoURL: String,
    videoURL: String,
    contentType: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        comment: {
          type: String,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

model("posts", Post);
