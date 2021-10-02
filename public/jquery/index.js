import { loadData } from './randomUser.js';

const cardContainer = $('.card-container');
let teamMembers = []

const memberInfoPopup = $('.member-info');

$(window).ready(() => {
  const data = loadData();

  data.then(res => {
    teamMembers = res.results;

    loadCards();
  }).catch(err => {
      console.log('err', err);
  });
  
});

const loadCards = () => {
  if (teamMembers.length > 0) {
    teamMembers.forEach((item, id) => {

      let div = document.createElement("div");
      div.classList.add('card');

      div.innerHTML = `
      <div class="img-wrapper">
        <img src="${item.picture.large}" alt="photo">
      </div>
      <div class="body-wrapper">
        <h3>Name: ${item.name.first} ${item.name.last}</h3>
        <p><span>Email: </span>${item.email}</p>
        <p><span>Department: </span>Lorem ipsum</p>
        <p><span>Department Description: </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, animi.</p>
        <div class="actions"><a class="button more-info-btn" id="${item.email}">More Details</a></div>
      </div>`;

      $(div).find('.more-info-btn').on('click', e => {
        loadMoreInfo(e.target.parentElement);
      });

      $(cardContainer[0]).append(div);
    });
  }
}

const loadMoreInfo = (target) => {
  const id = $(target).find('.more-info-btn');
  const closePopUp = $('.back-btn');
  const getInfo = teamMembers.find(element => element.email === $(id[0]).attr('id'));

  $('#img').attr('src', getInfo.picture.large);
  $('#name').text(`${getInfo.name.first} ${getInfo.name.last}`);
  $('#email').text(getInfo.email);
  $('#dob').text(getInfo.dob.date);
  $('#gender').text(getInfo.gender);
  $('#city').text(getInfo.location.city);
  $('#country').text(getInfo.location.country);
  $('#state').text(getInfo.location.state);
  $('#phone').text(getInfo.phone);

  $(memberInfoPopup).addClass('is-open');

  $(closePopUp).on('click', () => {
    $(memberInfoPopup).removeClass('is-open');
  });
}
