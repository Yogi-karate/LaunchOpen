  'use strict';

    var app1 = {}; // create namespace for mobile app
    
    //--------------
    // Models for mobile
    //--------------
    app1.Mobile = Backbone.Model.extend({
      defaults: {
        company: '',
        piece: '',
		price:''
      }
    });

    //--------------
    // Collections
    //--------------
    app1.MobileList = Backbone.Collection.extend({
      model: app1.Mobile,
      localStorage: new Store("backbone-mobile1")
    });

    // instance of the Collection
    app1.mobileList = new app1.MobileList();

    //--------------
    // Views
    //--------------
    
    // renders individual mobile list 
    app1.MobileView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#mobile-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
      },
      initialize: function(){
        this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
      },      
      events: {
        'click .destroy': 'destroy'
      },
   
      destroy: function(){
        this.model.destroy();
      }      
    });

    // renders the full list of mobile items calling TodoView for each one.
    app1.AppView = Backbone.View.extend({
      el: '#mobileapp',
      initialize: function () {
        app1.mobileList.on('add', this.addAll, this);
        app1.mobileList.on('reset', this.addAll, this);
        app1.mobileList.fetch(); // Loads list from local storage
      },
      events: {
        'click #add1': 'addMobile'
      },
      addMobile: function(e){
      
        app1.mobileList.create(this.newAttributes());
        this.$('#new-company').val('');
	this.$('#new-piece').val('');
	 this.$('#new-price').val(''); 
// clean input box
      },
      addOne: function(mobile){
        var view = new app1.MobileView({model: mobile});
        $('#mobile-list').append(view.render().el);
      },
      addAll: function(){
        this.$('#mobile-list').html(''); // clean the mobile list
        app1.mobileList.each(this.addOne, this);
      },
      newAttributes: function(){
        return {
company: $('#new-company').val(),
piece: $('#new-piece').val(),
price: $('#new-price').val()
        }
      }
    });

    //--------------
    // Initializers
    //--------------   

    app1.appView = new app1.AppView(); 