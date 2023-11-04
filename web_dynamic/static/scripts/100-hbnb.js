$(document).ready(() => {
  const checkedAmenities = {};

  $('.popover ul li input').click(function() {
    const amenity = $(this).data();

    if (this.checked) {
      checkedAmenities[amenity.id] = amenity.name;
    } else {
      delete checkedAmenities[amenity.id];
    }

    $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
  });

  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(res => res.json())
    .then(res => {
      if (res.status === 'OK') {
        const status = $('#api_status');
        status.addClass('available');
        status.css('background-color', '#ff545f');
      }

      const payload = {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': {},
      }
      fetch('http://0.0.0.0:5001/api/v1/places_search/', payload)
        .then(res => alert(JSON.stringify(res)))

      fetch('http://0.0.0.0:5001/api/v1/places_search/', payload)
        .then(res => res.json())
        .then(res => {
          const places = $('.places');
          for (const place of res) {
            const template = `
    <article>
	    <div class="title_box">
	      <h2>${ place.name }</h2>
	      <div class="price_by_night">${ place.price_by_night }</div>
	    </div>
	    <div class="information">
	      <div class="max_guest">${ place.max_guest } Guest${ (place.max_guest != 1) ? 's' : '' }</div>
        <div class="number_rooms">${ place.number_rooms } Bedroom${ (place.number_rooms != 1) ? 's' : '' }</div>
        <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${ (place.number_bathrooms != 1) ? 's' : '' }</div>
	    </div>
	    <div class="user">
        <b>Owner:</b> ${ place.user.first_name } ${ place.user.last_name }
      </div>
      <div class="description">
	      ${ place.description }
      </div>
    </article>`;
	          places.append(template);
	        }
        });
    });

});
