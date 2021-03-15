const yup = require('yup');

const slugSchema = yup.object().shape({
  slug: yup.string(),
  url: yup.string().url().required()
});
module.exports = slugSchema;