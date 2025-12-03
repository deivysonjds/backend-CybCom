import models from "../models/index.js";

const isResourceOwner = (resourceModel) => async (req, res, next) => {
  
  const resource = await models[resourceModel].findByPk(
    req.user
  );

  if (!resource) {
    return res.sendStatus(404);
  }

  if (resource.userId && resource.userId !== req.user) {
    return res.status(403).send("Forbidden");
  }

  if (resourceModel === "User" && resource.id !== req.user) {
    return res.status(403).send("Forbidden");
  }

  req.resource = resource; // Attach the resource to the request for later use
  next();
};

export default isResourceOwner;