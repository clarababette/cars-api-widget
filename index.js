const template = document.querySelector('#handlebars-template').innerHTML;
const templateScript = Handlebars.compile(template);
const carTableTemplate = document.querySelector(
  '#car-table-template',
).innerHTML;
const carTableTemplateScript = Handlebars.compile(carTableTemplate);

const container = document.querySelector('.container');

let cars;
let colors;
let makes;

const getData = async () => {
  await axios
    .get('https://api-tutor.herokuapp.com/v1/cars')
    .then((response) => {
      cars = response.data;
    });
  await axios
    .get('https://api-tutor.herokuapp.com/v1/colors')
    .then((response) => {
      colors = response.data;
    });
  await axios
    .get('https://api-tutor.herokuapp.com/v1/makes')
    .then((response) => {
      makes = response.data;
    });
};

const renderData = async () => {
  await getData();
  container.innerHTML = templateScript({
    colors: colors,
    makes: makes,
  });
  document.querySelector('.cars').innerHTML = carTableTemplateScript({
    cars: cars,
  });
};
renderData();

const filter = () => {
  const selectMake = document.querySelector('#make');
  const selectColor = document.querySelector('#color');
  const make = selectMake.value;
  const color = selectColor.value;

  switch (true) {
    case make == 'all' && color == 'all':
      axios.get('https://api-tutor.herokuapp.com/v1/cars').then((response) => {
        document.querySelector('.cars').innerHTML = carTableTemplateScript({
          cars: response.data,
        });
      });
      break;
    case make != 'all' && color == 'all':
      axios
        .get(`https://api-tutor.herokuapp.com/v1/cars/make/${make}`)
        .then((response) => {
          document.querySelector('.cars').innerHTML = carTableTemplateScript({
            cars: response.data,
          });
        });
      break;
    case make == 'all' && color != 'all':
      axios
        .get(`https://api-tutor.herokuapp.com/v1/cars/color/${color}`)
        .then((response) => {
          document.querySelector('.cars').innerHTML = carTableTemplateScript({
            cars: response.data,
          });
        });
      break;
    case make != 'all' && color != 'all':
      axios
        .get(
          `https://api-tutor.herokuapp.com/v1/cars/make/${make}/color/${color}`,
        )
        .then((response) => {
          document.querySelector('.cars').innerHTML = carTableTemplateScript({
            cars: response.data,
          });
        });
      break;
    default:
      break;
  }
};
