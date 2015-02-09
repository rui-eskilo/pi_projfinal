
var sendMail = function() {
	 var name = document.getElementById("name");
   var mail = document.getElementById("mail");
   var comment = document.getElementById("comment");
   var div = document.getElementById("contact");
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'nWryQ-a-tKIYoicHqHPmWw',
        'message': {
          'from_email': mail.value,
          'to': [
              {
                'email': 'victor.silva.morais@gmail.com',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Nome: ' + name.value,
          'html': comment.value
        }
      }
     }).done(function(response) {
      div.removeChild(document.getElementById("contactForm"));
      var h4 = document.createElement("h4");
      var text = document.createTextNode("A tua mensagem foi enviada com sucesso. Certamente iremos responder num futuro próximo. No entanto se isso não acontecer podes sempre registar-te e apresentar uma queixinha! (\",)");
      div.appendChild(h4.appendChild(text));
     });
     return false;
};