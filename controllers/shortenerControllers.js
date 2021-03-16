const pool = require('../db');
const slugSchema = require('../schema/slugSchema');
const { nanoid } = require('nanoid');



module.exports.redirectToUrlBySlug = async (req, res) => {
  try {
    const { id: slug } = req.params;
    const data = await pool.query('SELECT url FROM urls WHERE slug = $1', [slug]);
    const url = data.rows[0];
    if (url) {
      res.redirect(url.url);
    }
    res.redirect(`/error.html`);
  } catch (err) {
    // res.redirect(`/error.html`);
    console.error(err.message);
  }

}
module.exports.createNewSlug = async (req, res) => {
  try {
    let { slug, url } = req.body;
    await slugSchema.validate({
      slug,
      url
    });
    if (!slug) {
      slug = nanoid(5);
    }
    slug = slug.toLowerCase()
    const newUrl = await pool.query('INSERT INTO urls (slug, url) VALUES($1, $2) RETURNING *', [slug, url]);
    res.send(newUrl);
  } catch (err) {
    console.error(err.message);
    if (err.message.startsWith('duplicate key value violates unique constraint')) {
      res.status(400)
      err.message = 'Slug in use 🍔'
    }
    else if (err.message.startsWith('url must be a valid URL')) {
      res.status(400)
      err.message = 'url must be a valid URL 🐌'
    }
    else if (err.message.startsWith('url is a required field')) {
      res.status(400)
      err.message = 'url is required 🐌';
    }
  }

}
