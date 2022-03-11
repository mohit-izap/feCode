$(document).ready(function () {

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('input[type="text"]').val().toLowerCase();

    var x, y;
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      $('.loading').show();
      $('.features').hide();
      $('.result').hide();
      $('.above-the-fold').hide();
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url =
        'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          $('.loading').hide();
          $('.result').css('display', 'flex');
          $('.above-the-fold').show();
          $('.above-the-fold h1').text(`Can't Find The Right Person?`);
          $('.above-the-fold h2').replaceWith(`<strong>Try Again</strong> - Make a new search`);
          $('.above-the-fold').addClass('search-again');
        })
        .catch((e) => console.log(e));
    } else if (x !== true) {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }
  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        $('.loading').show();
        $('.features').hide();
        $('.result').hide();
        $('.above-the-fold').hide();
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            $('.loading').hide();
            $('.result').css('display', 'flex');
            $('.above-the-fold').show();
            $('.above-the-fold h1').text(`Can't Find The Right Person?`);
            $('.above-the-fold h2').replaceWith(`<strong>Try Again</strong> - Make a new search`);
            $('.above-the-fold').addClass('search-again');
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

  $("form .badge").on("click", function (e) {
    $('form .badge').removeClass('active');
    $(this).addClass('active');
    if(e.target.innerHTML==='PHONE NUMBER'){
      $('.input-group input').attr('placeholder', 'Enter a Phone Number')
      $('.input-group .error-msg').text('Please enter a valid Phone Number');
    }else{
      $('.input-group input').attr('placeholder', 'Enter an Email Address')
      $('.input-group .error-msg').text('Please enter a valid email address');
    }
  })

});
