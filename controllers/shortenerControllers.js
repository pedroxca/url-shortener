const pool = require('../db');
const slugSchema = require('../schema/slugSchema');
const { nanoid } = require('nanoid');



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
      res.send('Slug in use 🍔');
    }
  }

}

module.exports.redirectToUrlBySlug = async (req, res) => {
  // SELECT url FROM urls WHERE slug = slug;

  try {
    const { slug } = req.params;
    const data = await pool.query('SELECT url FROM urls WHERE slug = $1', [slug]);
    const url = data.rows[0].url
    res.redirect(url);
    // console.log(url);
  } catch (err) {
    console.error(err.message);
  }

}
