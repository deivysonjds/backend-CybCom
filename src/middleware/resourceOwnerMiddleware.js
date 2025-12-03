import models from "../models/index.js";

const isResourceOwner = (resourceModel) => async (req, res, next) => {
  
  const resource = await models[resourceModel].findByPk(
    req.user
  );

  if (!resource) {
    return res.status(404).json({error: 'Recurso não encontrado'});
  }

  if (resource.userId && resource.userId !== req.user) {
    return res.status(403).json({error: 'Não autorizado'});
  }

  if (resourceModel === "User" && resource.id !== req.user) {
    return res.status(403).send({error: 'Não autorizado'});
  }

  req.resource = resource; // Attach the resource to the request for later use
  next();
};

export default isResourceOwner;