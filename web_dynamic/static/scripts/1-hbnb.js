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
});
