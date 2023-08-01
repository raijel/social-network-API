import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "post not found" });
    res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description, category, community } = req.body;
    const newPost = new Post({
      title,
      description,
      user: req.user.id,
      category,
      community,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    if (req.user.superuser == true) {
      const post = await Post.findByIdAndDelete(req.params.id);

      if (!post)
        return res.status(404).json({ message: "post not found" });
      console.log("post updated successfully by superuser");

      res.status(204).json({ message: "post deleted successfully" });
    } else {
      const post = await Post.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
      });
      if (!post)
        return res.status(404).json({ message: "post not found" });
      res.status(204).json({ message: "post deleted successfully" });
    }
  } catch (err) {
    return res.stauts(404).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    if (req.user.superuser == true) {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { ...req.body, edited: true },
        { new: true }
      );

      if (!post) return res.status(404).json({ message: "post not found" });
      console.log("post updated successfully by superuser");
      res.json(post);
    } else {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            edited: true,
          },
        },
        { new: true }
      );

      if (!post)
        return res.status(404).json({ message: "post not found" });
      console.log("post updated successfully by its author");
      res.json({
        title: post.title,
        description: post.description,
      });
    }
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
