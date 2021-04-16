const pool = require('../db');
const slugSchema = require('../schema/slugSchema');
const { nanoid } = require('nanoid');

const options = {
  slug: null,
  url: null,
  error: null,
  slugs: null
}
module.exports.getErrorPage = async (req, res) => {

  res.render('error.ejs');
}
module.exports.getHomePage = async (req, res) => {
  const user = await req.user;
  const urls = await pool.query("select urls.u_id, urls.slug from urls left join users on urls.u_id='users.u_id'");
  const newUrls = urls.rows.map(url => {
    if (url.u_id == user.u_id) {
      return url
    } else {
      return
    }
  });
  options.slugs = newUrls.filter(u => u !== undefined);
  res.render('index.ejs', options);

}
module.exports.redirectToUrlBySlug = async (req, res) => {
  try {
    const { id: slug } = req.params;
    const data = await pool.query('SELECT url FROM urls WHERE slug = $1', [slug]);
    const url = data.rows[0];
    if (!url) {
      throw 'Slug not found'
    }
    res.redirect(url.url);
  } catch (err) {
    res.redirect(`/error`);
    console.error(err.message);
    // res.send(err.message)  
  }

}
module.exports.createNewSlug = async (req, res) => {
  try {
    let { slug, url } = req.body;
    const user = await req.user;
    await slugSchema.validate({
      slug,
      url
    });
    if (!slug) {
      slug = nanoid(5);
    }
    slug = slug.toLowerCase()
    const newUrl = await pool.query('INSERT INTO urls (u_id, slug, url) VALUES($1, $2, $3) RETURNING *', [user.u_id, slug, url]);
    console.log(newUrl.rows[0].slug, newUrl.rows[0].url, newUrl.rows[0].u_id);
    options.slug = newUrl.rows[0].slug;
    options.url = newUrl.rows[0].url;
    options.error = null;
    res.render('index.ejs', options);
    options.slug = null;
    options.url = null;
    options.error = null;
  } catch (err) {
    console.error(err.message);
    if (err.message.startsWith('duplicate key value violates unique constraint')) {
      res.status(400)
      err.message = 'Slug in use 🍔'
      options.error = err.message;
      res.render('index.ejs', options);
      return
    }
    else if (err.message.startsWith('url must be a valid URL')) {
      res.status(400)
      err.message = 'url must be a valid URL 🐌';
      options.error = err.message;
      res.render('index.ejs', options);
      return
    }
    else if (err.message.startsWith('url is a required field')) {
      res.status(400)
      err.message = 'url is required 🐌';
      options.error = err.message;
      res.render('index.ejs', options);
      return
    }
    options.error = err.message;
    res.render('index.ejs', options)
    return
  }

}
