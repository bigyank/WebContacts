const { Joi } = require("celebrate");

const validSites = ["facebook", "github", "instagram", "youtube", "twitter"];

const addPersonValidator = Joi.object().keys({
  name: Joi.string().required(),
  contacts: Joi.object()
    .keys({
      url: Joi.string().uri().required(),
      site: Joi.string()
        .required()
        .valid(...validSites),
    })
    .required(),
});

const contactValidator = Joi.object().keys({
  url: Joi.string().uri().required(),
  site: Joi.string()
    .required()
    .valid(...validSites),
});

const idValidator = Joi.object().keys({
  id: Joi.string().required(),
});

const idAndUrlIDValidator = Joi.object().keys({
  id: Joi.string().required(),
  urlID: Joi.string().required(),
});

const authValidator = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  idValidator,
  idAndUrlIDValidator,
  addPersonValidator,
  contactValidator,
  authValidator,
};
