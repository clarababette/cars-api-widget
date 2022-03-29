const template = document.querySelector('#handlebars-template').innerHTML;
const templateScript = Handlebars.compile(template);

const container = document.querySelector('.container');

axios.get('http://api-tutor.herokuapp.com/v1/cars').then((response) => {
  console.log(response);
  container.innerHTML = templateScript({cars: response.data});
});
