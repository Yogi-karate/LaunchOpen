  main = Backbone.View.extend({
      el: '#main',
      initialize: function () {
      },
      events: {
        'click #mobile_button': 'mobileMenu', // binding our show and hide events for respective containers
       'click #book_button': 'booksMenu'
      },
      booksMenu: function(){
        
        $('#mobile_container').hide();
		$('#book_container').show();
      },
     mobileMenu: function(){
        	$('#book_container').hide();
         $('#mobile_container').show();
	
      }
    });
	var menu= new main();