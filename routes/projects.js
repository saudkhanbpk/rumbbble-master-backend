const fs = require("fs");
const projectsRouter = require("express").Router();
const { model } = require("mongoose");

const upload = require("../services/multer");
const cloudinaryDeleteImg = require("../services/deletefile");

const requireLogin = require("../middlewares/requireLogin");

const Post = model("posts");
const Comment = model("comments");
const Like = model("likes");

projectsRouter.get("/all", async (request, response) => {
  let filters = {};
  if (request.query.categoryId != 0) {
    filters.category = { $eq: request.query.categoryId };
  }
  const projects = await Post.find(filters)
    .populate("author", "name picture -_id")
    .limit(20)
    .sort({ _id: -1 })
    .exec();
  response.send(projects);
});

projectsRouter.get("/", requireLogin, async (request, response) => {
  const projects = await Post.find({ author: request.user.id });
  response.send(projects);
});

projectsRouter.post(
  "/",
  requireLogin,
  upload.single("image"),
  async (request, response) => {
    console.log("requesttt", request);
    const newPost = await new Post({
      ...request.body,
      image: request.file.path,
      author: request.user.id,
    }).save();
    response.redirect("/");
  }
);

projectsRouter.get("/:projectId", async (request, response) => {
  const { projectId } = request.params;
  const project = await Post.findById(projectId).populate(
    "author",
    "_id name picture"
  );
  response.send(project);
});

projectsRouter.patch("/:projectId", async (request, response) => {
  const { projectId } = request.params;
  await Post.updateOne({ _id: projectId }, { $set: { ...request.body } });
  response.json({});
});

projectsRouter.delete("/:projectId", async (request, response) => {
  const { projectId } = request.params;
  const post = await Post.findByIdAndDelete(projectId);
  await cloudinaryDeleteImg(post.image);
  // fs.unlinkSync(post.image);
  await Comment.find({ post: projectId }).remove();
  await Like.find({ post: projectId }).remove();
  response.json({ status: "success" });
});

projectsRouter.get("/author/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    if (!userId) {
      return response.status(400).send("User ID must be provided");
    }
    const authorPosts = await Post.find({ author: userId }).exec();
    response.send(authorPosts);
  } catch (error) {
    console.error(error);
    response.status(500).send("An error occurred");
  }
});

module.exports = projectsRouter;
