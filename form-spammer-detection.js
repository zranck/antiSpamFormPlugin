$(document).ready(function() {
  //counting how long user is on the page.
  //a human isn't going to fill out and submit in a few seconds.
  var formCounter=0;
    (function() {
        setInterval(function() {
            formCounter++
        }
        , 1000)
    }
    )();
  
  //initial check for ip
  countryCheck();
  
  function countryCheck() {
    // Checking for top 5 attack originating countries
    // Russia, China, Ukraine, India, Thailand
    // https://www.spamhaus.org/statistics/countries/
    // https://www.projecthoneypot.org/comment_spammer_top_countries.php?dt=30
    //send IP to API
    $.getJSON("https://freegeoip.net/json/", function (data) {
        var country = data.country_name;
        var ip = data.ip;
        console.log('ip is '+ip+' and country is '+country);
      if ($.inArray(country, ['Russia', 'China', 'Ukraine', 'India', 'Thailand', 'Mali']) >= 0) {
        badCountry(); //banned country found
      }
    });
  }
  
  
  //check if email address corresponds to a spam domain
  function validEmail(e) {
     var userEmail=$('input[name=email]').val();
        userEmail=userEmail.split('@');
        userEmail=userEmail[1].split('.');
        userEmail=userEmail[1].toLowerCase().toString();
    if(userEmail!='ru' && userEmail!='ua' && userEmail!='ml' && userEmail!='tst' && userEmail!='top' && userEmail!='xyz' && userEmail!='info') {
      console.log('pass'+userEmail);
      return true;
    } else {
      console.log('bad email');
      badActor(e);
    }
  }
  
  function validPhone(e) {
     var userPhone=$('input[name=phone]').val();
     if(userPhone.length >= 11 ||!$.isNumeric(userPhone) || userPhone.length <= 9) {
       badActor(e);
     }
  }
  
  //check how long form took to complete
  function isHuman(e){
    //check the counter
    console.log(formCounter);
    if(formCounter<=4) {
        badActor(e);
    }
  }
  
  //check if honeypot is triggered
  function honeyCheck(e){
    if($('.zacsAnt').val().length) { 
      badActor(e);
    }
  }
  
  
  //probably spam detected
  function badActor(e) {
    e.preventDefault();
    $('#contactFormBox').parent().parent().html('<p>Sorry, we seem to be having difficulties displaying this form. If you need assistance please call<p>');
    return false;
  }
  
  //probably spam country detected
  function badCountry() {
    $('#contactFormBox').parent().parent().html('<p>Sorry, we seem to be having difficulties displaying this form. If you need assistance please call<p>');
    return false;
  }
  
  //on form submission
  $("#contactForm").submit(function(e) {
    validEmail(e);
    validPhone(e);
    isHuman(e);
    honeyCheck(e);
  });
  
  
  
});
