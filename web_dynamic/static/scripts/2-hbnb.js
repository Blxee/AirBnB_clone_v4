$(document).ready(() => {
  const checkedAmenities = {};

  $('.popover ul li input').click(function () {
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
    });
});
