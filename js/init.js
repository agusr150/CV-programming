/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function(e) {
      e.preventDefault()
      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      // var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
      //          '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;
      console.log('contactName=' + contactName + '&contactEmail=' + contactEmail +
                '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage)
      
      // const sgMail = require('@sendgrid/mail')
      // sgMail.setApiKey('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')
      // const msg = {
      //      to: 'ignatiusagus150@gmail.com',
      //      from: 'ignagusraharjo135@gmail.com',
      //      subject: `${contactSubject}`,
      //      text: 'my website',
      //      html: `<strong>name: ${contactName}, email: ${contactEmail}, content:${contactMessage} </strong>`,
      //    };
      // sgMail.send(msg)

      //let mail = {"personalizations": [{"to": [{"email": "ignatiusagus150@gmail.com"}]}],"from": {"email": "ignagusraharjo135@gmail.com"},"subject": `${contactSubject}`,"content": [{"type": "text/plain", "value": `name: ${contactName}, email: ${contactEmail}, content:${contactMessage}`}]}
      let mail = {"personalizations": 
      [
        {"to": [
          {"email": "ignatiusagus150@gmail.com"}
        ]}
      ],
      "from": {"email": "ignagusraharjo135@gmail.com"},
      "subject": "test",
      "content": [{
        "type": "text/plain", 
        "value": "jqueryyyy testttt"
        }]
      }
      console.log(mail, 'before to ajax')

      var settings = {
      //   "async": true,
      //   "crossDomain": true,
         method: "POST",
         url: "https://api.sendgrid.com/v3/mail/send",
         
         headers: {
           Authorization: "Bearer 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",
          // "content-type": "application/json",
         },
       // "processData": false,
         data: mail,
         dataType: "json"
       }


      $.ajax({
         method: "POST",
         url: "https://api.sendgrid.com/v3/mail/send",
         headers: {
              Authorization: "Bearer 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",
            },   
         data: mail,
         dataType: "json",
         //settings,
	      success : function(resp) {
            console.log(resp)
            // Message was sent
            if (!resp) {
               console.log('suksessssss')
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               console.log('gagalllllll')
               $('#image-loader').fadeOut();
               //$('#message-warning').html(resp);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });



   /*----------------------------------------------------*/
   /*	quotation form
   ------------------------------------------------------*/
   var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
      "method": "GET",
      "headers": {
         "x-rapidapi-host": "quotes15.p.rapidapi.com",
         "x-rapidapi-key": "75d451094amsh903243283455443p16f6d8jsnf5e7688c9342"
      }
   }
   
   $.ajax(settings).done(function (response) {
      console.log(response.content)
      $('#quote1').append(`                 
      <p>${response.content}</p>
      <cite>${response.originator.name}</cite>
      `)
   });

   
   $.ajax({
      method: "get",
      url: 'https://type.fit/api/quotes'
   })
   .done(data=>{
      let hasil =JSON.parse(data)
      console.log(hasil)
      let num = Math.floor(Math.random() * (hasil.length-3))
      console.log(num)
      if(hasil[num].author==='null'){
         hasil[num].author = 'anonymous'
      }
         $('#quote3').append(` 
                              <blockquote >
                                 <p>${hasil[num].text}</p>
                                 <cite>${hasil[num].author}</cite>
                              </blockquote >  
                           `)
   })
   .fail(err=>{
      console.log(err)
   })
   


});








