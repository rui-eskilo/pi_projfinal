var sendMail = function(name, email, coment) {
	console.log(name);
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'nWryQ-a-tKIYoicHqHPmWw',
        'message': {
          'from_email': 'victor.silva.morais@gmail.com',
          'to': [
              {
                'email': 'victor.silva.morais@gmail.com',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'YOUR SUBJECT HERE!',
          'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
};