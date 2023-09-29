const userRouter = require("express").Router();

userRouter.get('/posts', async (request, response) => {
  
});

userRouter.get('/:userId/projects', async (request, response) => {
    const { userId } = request.params;
    const projects = await Post.find({ author: userId })
      .populate('author', 'name picture -_id') // Populate author details
      .exec();
    
    response.send(projects);
  });

module.exports = userRouter;
