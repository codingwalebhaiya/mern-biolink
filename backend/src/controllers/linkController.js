import linkModel from "../models/linkModel.js";

const addLink = async (req, res) => {
  try {
    const { url, title } = req.body;
    const user = req.user; // from auth middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get the last link for this user to place new link at the end
    const lastLink = await linkModel
      .findOne({
        user: user._id,
      })
      .sort({ order: -1 });
    const newOrder = lastLink ? lastLink.order + 1 : 0;

    const link = await linkModel.create({
      user: user._id,
      title,
      url,
      order: newOrder,
    });
    //  await link.populate('user', 'username profile')
    res.status(201).json({
      success: true,
      message: "Link added successfully",
      link: {
        _id: link._id,
        title: link.title,
        url: link.url,
        order: link.order,
        clicks: link.clicks,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserLinks = async (req, res) => {
  try {
    const user = req.user; // from auth middleware
    if (!user) return res.status(404).json({ message: "User not found" });

   //const links = user.links;
    const links = await linkModel
      .find({
        user: user._id,
      })
      .sort({ order: 1 });
    

    res.status(200).json({
      success: true,
      message: "Links fetched successfully",
      links,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateLink = async (req, res) => {
  const { linkId } = req.params;
  const { title, url } = req.body;
  try {
    const user = req.user; // from auth middleware
    if (!user) return res.status(404).json({ message: "User not found" });
    const link = await linkModel.findOneAndUpdate(
      { _id: linkId, user: user._id },
      { title, url },
      { new: true }
    );

    if (!link) return res.status(404).json({ message: "Link not found" });
    //await link.populate('user', 'username profile');
    res.status(200).json({
      success: true,
      message: "Link updated successfully",
      link: {
        _id: link._id,
        title: link.title,
        url: link.url,
        order: link.order,
        clicks: link.clicks,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteLink = async (req, res) => {
  const { linkId } = req.params; // match route param
  try {
    const user = req.user; // from auth middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    const link = await linkModel.findOneAndDelete({
      _id: linkId,
      user: user._id,
    });
    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addLink, getUserLinks, updateLink, deleteLink };
