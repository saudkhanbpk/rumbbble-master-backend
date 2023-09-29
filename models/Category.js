const { Schema, model } = require("mongoose");

const Category = new Schema(
  {
    label: String,
  },
  { timestamps: true }
);

model("categories", Category);
