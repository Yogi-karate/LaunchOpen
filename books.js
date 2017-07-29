
	 'use strict';

    var app = {}; // create namespace for our app
 
    //--------------
    // Models
    //--------------
    app.Book = Backbone.Model.extend({
      defaults: {
        title: '',
        author: '',
		price1: '',
		 date1:'',
		 sel:''
		
      }
	

    });

    //--------------
    // Collections
    //--------------
    app.BookList = Backbone.Collection.extend({
      model: app.Book,
	
      localStorage: new Store("backbone-book1")
    });

	 app.BookListNew = Backbone.Collection.extend({
      model: app.Book,
	
      localStorage: new Store("backbone-book2")
    });
    // instance of the Collection
    app.bookList = new app.BookList();

    //--------------
    // Views
    //--------------
     
app.list= new app.BookListNew();


    // renders individual book items list 
    app.BookView = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#book-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
      },
      initialize: function(){
        this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
      },      
      events: {
		   
		 'click [type="checkbox"]': 'clicked'
	
      },
 
  	  clicked: function(e){
	var xx=this.model;
	 if (e.currentTarget.checked == true)
	 {
		 e.currentTarget.value = "true";
 xx.set("sel","checked");

	 }
  else
  {
	  	xx.set("sel","");
    e.currentTarget.value = "false";
  }
	
  }
    });


    app.AppView = Backbone.View.extend({
      el: '#bookapp',
      initialize: function () {
        app.bookList.on('add', this.addAll, this);
       app.bookList.on('reset',  this.addAll, this);
	   app.bookList.on('remove',  this.addAll, this);
        app.bookList.fetch(); // Loads list from local storage
      },
      events: {
        'click #add': 'addBook',
		'click #book_archieve':'archieveBook',
		 'click #book_delete':'deleteBook'
      },
      addBook: function(e){
      
        app.bookList.create(this.newAttributes());
        this.$('#new-title').val('');
	this.$('#new-author').val('');
	this.$('#new-price1').val('');
// clean input box
      },
      addOne: function(book){
        var view = new app.BookView({model: book});
        $('#book-list').append(view.render().el);
      },
	   
	  addAll: function(){
      this.$('#book-list').html(''); // clean the book list
       app.bookList.each(this.addOne, this);
	   //app.list.each(this.addOne, this);
      },
	  

      newAttributes: function(){
        return {
title: $('#new-title').val(),
author: $('#new-author').val(),
price1:$('#new-price1').val(),
date1:$('#new-date').val(),
sel:''
        }
      },
	  
	  archieveBook: function(){

		_.chain(app.bookList.models).clone().each(function(model){
   if(model.get("sel")=="checked")
	{
		var title=model.get("title");
		var author=model.get("author");
		var price=model.get("price1");
		var date=model.get("date1");
		var sel=model.get("sel");
		app.list.create({title:title,author:author,price1:price,date1:date,sel:sel});
  model.destroy();
	}
});
		console.log(app.bookList);
		console.log(app.list);
	  },
		  deleteBook: function(){

		_.chain(app.bookList.models).clone().each(function(model){
   if(model.get("sel")=="checked")
	{
  model.destroy();
	}
});
		console.log(app.bookList);
		console.log(app.list);
	  },
	
    });
	
	
	

    // renders individual book items list
    app.BookViewNew = Backbone.View.extend({
      tagName: 'tr',
      template: _.template($('#book-template1').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this; // enable chained calls
      },     
      events: {
		   
		 'click [type="checkbox"]': 'clicked'

      },
 
    clicked: function(e){
	var xx=this.model;
	 if (e.currentTarget.checked == true)
	 {
		 e.currentTarget.value = "true";
 xx.set("sel","checked2");
console.log(this.model.attributes);
	 }
  else
  {
	  	xx.set("sel","");
    e.currentTarget.value = "false";
  }
	
  } 

        
    });
	
	app.bookViewNew=new  app.BookViewNew();
	
	    app.AppViewNew = Backbone.View.extend({
      el: '#bookapp1',
      initialize: function () {
        app.list.on('add', this.addAll, this);
    app.list.on('reset',  this.addAll, this);
	app.list.on('remove',  this.addAll, this);
	app.list.fetch();
   
      },
   events:
   {
	   'click #book_del1':'deleteBook',
   },

      addOne: function(book){
        var view = new app.BookViewNew({model: book});
        $('#book-list1').append(view.render().el);
      },
	   
	  addAll: function(){
     this.$('#book-list1').html(''); // clean the book list
       app.list.each(this.addOne, this);
      },
	  
	  
	    deleteBook: function(){

  _.chain(app.list.models).clone().each(function(model){
   if(model.get("sel")=="checked2")
	{
		var title=model.get("title");
		var author=model.get("author");
		var price=model.get("price1");
		var date=model.get("date1");
		var sel=model.get("sel");
		app.bookList.create({title:title,author:author,price1:price,date1:date,sel:sel});
  model.destroy();
	}
});
		console.log(app.bookList);
		console.log(app.list);
	  },
      
	});

	


	
    //--------------
    // Initializers
    //--------------   

    app.appView = new app.AppView(); 
	app.appViewNew=new app.AppViewNew();
	
