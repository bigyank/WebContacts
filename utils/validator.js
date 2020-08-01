const { Joi } = require("celebrate");
Joi.objectId = require("joi-objectid")(Joi);

const addPersonValidator = Joi.object().keys({
  name: Joi.string().required(),
  contacts: Joi.array()
    .items(
      Joi.object().keys({
        url: Joi.string().uri().required(),
        site: Joi.string().required(),
      })
    )
    .required(),
});

const contactValidator = Joi.object().keys({
  url: Joi.string().uri().required(),
  site: Joi.string().required(),
});

module.exports = {
  addPersonValidator,
  contactValidator,
};
