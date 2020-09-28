#!/usr/bin/node
$(document).ready(function () {
  const amenityCheck = [];
  const amenityNames = [];

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') $('DIV#api_status').addClass('available');
    else $('DIV#api_status').removeClass('available');
  }); // end get

  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenityCheck.push($(this).attr('data-id'));
      amenityNames.push($(this).attr('data-name'));
    } else {
      let index = amenityCheck.indexOf($(this).attr('data-id'));
      amenityCheck.splice(index, 1);
      index = amenityNames.indexOf($(this).attr('data-name'));
      amenityNames.splice(index, 1);
    } // end if-else
    $('div.amenities h4').text(amenityNames);
  }); // end input change

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (const [key, value] of Object.entries(data)) {
        const article = $('<article/>');
        console.log(key); // capt. Obvious semistandard

        const titleBox = $('<div/>', { class: 'title_box' });
        $('<h2/>', { text: value.name }).appendTo(titleBox);
        $('<div/>', { class: 'price_by_night', text: `$${value.price_by_night}` }).appendTo(titleBox);
        titleBox.appendTo(article);

        const info = $('<div/>', { class: 'information' });
        $('<div/>', { class: 'max_guest', text: `${value.max_guest} Guests` }).appendTo(info);
        $('<div/>', { class: 'number_rooms', text: `${value.number_rooms} Bedrooms` }).appendTo(info);
        $('<div/>', { class: 'number_bathrooms', text: `${value.number_bathrooms} Bathrooms` }).appendTo(info);
        info.appendTo(article);

        const desc = $('<div/>', { class: 'description', text: `${value.description}` });
        desc.appendTo(article);

        $('section.places').append(article);
      } // end for loop
    } // end success
  }); // end ajax

  $(':button').click(function () {
    const data = { amenities: amenityCheck };
    $('section.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (data) {
        for (const [key, value] of Object.entries(data)) {
          const article = $('<article/>');
          console.log(key); // capt. Obvious semistandard

          const titleBox = $('<div/>', { class: 'title_box' });
          $('<h2/>', { text: value.name }).appendTo(titleBox);
          $('<div/>', { class: 'price_by_night', text: value.price_by_night }).appendTo(titleBox);
          titleBox.appendTo(article);

          const info = $('<div/>', { class: 'information' });
          $('<div/>', { class: 'max_guest', text: `${value.max_guest} Guests` }).appendTo(info);
          $('<div/>', { class: 'number_rooms', text: `${value.number_rooms} Bedrooms` }).appendTo(info);
          $('<div/>', { class: 'number_bathrooms', text: `${value.number_bathrooms} Bathrooms` }).appendTo(info);
          info.appendTo(article);

          const desc = $('<div/>', { class: 'description', text: `${value.description}` });
          desc.appendTo(article);

          $('section.places').append(article);
        } // end for loop
      } // end success
    }); // end ajax
  }); // end click
});
