#!/usr/bin/node
$(document).ready(function () {
  let amenityCheck = [];
  let amenityNames = [];
  $("input[type=checkbox]").change(function () {
    if ($(this).prop('checked')) {
      amenityCheck.push($(this).attr('data-id'));
      amenityNames.push($(this).attr('data-name'));
    } else {
      let index = amenityCheck.indexOf($(this).attr('data-id'));
      amenityCheck.splice(index, 1);
      index = amenityNames.indexOf($(this).attr('data-name'));
      amenityNames.splice(index, 1);
    }
    $('div.amenities h4').text(amenityNames)
  });
});
