const form = document.querySelector('form');
const apiResponse = document.querySelector('#api-response')

const handleEventSubmit = async e => {
  e.preventDefault();
  const formData = new FormData(form);
  const slug = formData.get('slug');
  const url = formData.get('url');
  const body = {
    slug,
    url
  }
  const response = await fetch('/url', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  apiResponse.innerHTML = `<h3>Slug: ${data.rows[0].slug}</h3><h3>Url: ${data.rows[0].url}</h3>`

    console.log(data.rows[0]);

}


form.addEventListener('submit', handleEventSubmit)