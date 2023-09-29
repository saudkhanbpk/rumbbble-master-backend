const categoriesRouter = require("express").Router();
const { model } = require("mongoose");


const Category = model("categories");

/** For development usecase */
categoriesRouter.post("/create", async (request, response) => {
  if (!request.body?.label) {
    response.status(404).send({ error: `label is missing.` });
  } else {
    const { label } = request.body;
    const query = Category.where({ label });
    const isCategoryAvail = await query.findOne();
    if (isCategoryAvail) {
      response.status(404).send({ error: `label is already available.` });
    } else {
      const newCategory = await new Category({
        ...request.body,
        label,
      }).save();
      response.status(200).send({ status: "Success!!", response: newCategory });
    }
  }
});

categoriesRouter.get("/all", async (request, response) => {
  const getAllCategories = await Category.find().exec();
  response.status(200).send(getAllCategories);
});

module.exports = categoriesRouter;
