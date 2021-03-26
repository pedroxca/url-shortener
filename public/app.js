const form = document.querySelector('form');
const apiResponse = document.querySelector('#api-response');
const loadingElement = document.querySelector('#loading');

loadingElement.style.display = 'none';


const handleEventSubmit = async e => {
  e.preventDefault();
  apiResponse.innerHTML = '';
  loadingElement.style.display = '';
  const formData = new FormData(form);
  const slug = formData.get('slug');
  const url = formData.get('url');
  const body = {
    slug,
    url
  }
  if (!body.url) {
    apiResponse.innerHTML = 'Url is required 🐌!';
  }
  const response = await fetch('/url', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  form.reset();
  if (data) {
    loadingElement.style.display = 'none';
    apiResponse.innerHTML = `<h3>Slug: ${data.rows[0].slug}</h3><h3>Url: ${data.rows[0].url}</h3>`;
  }
}


form.addEventListener('submit', handleEventSubmit)