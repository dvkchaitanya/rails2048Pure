// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var TileModel = Backbone.Model.extend({
	div_id: "sample",
	div_content:"default_content"
});

var TileBoardView = Backbone.View.extend({
			// el:	'#board',	
			tagName: 'div', 
			events: {
				"click .tile"	:"tileClickHandler"
			},
			render: function(){
				this.collection.each(function(tileModel){
					console.log(tileModel);
						 var tileView = new TileView({model:tileModel});
						 this.$el.append(tileView.el);
					 },this);
			},
			initialize: function(){
				this.$el.attr({id:'board'});
				this.collection = this.options.collection;
				// console.log(this.collection);
				console.log(this.$el.html());
				return this.render();
			},
			tileClickHandler: function(event){
				alert("tile  clicked");
				return false;
			}
	});

_.templateSettings = {
    evaluate    : /\{\{(.+?)\}\}/g,
    interpolate : /\{\{=(.+?)\}\}/g,
    escape      : /\{\{-(.+?)\}\}/g
}

var TileCollection = Backbone.Collection.extend({
	model: TileModel
});

var TileView =Backbone.View.extend({
	tagName: "div",
	initialize: function(){
		console.log("inside initialize function");
		this.model=this.options.model;
		this.$el.attr({id:this.model.get("div_id"),class:"tile"});
		this.model.on("change",this.updateElement);
		this.render();
	},
	template: _.template($("#tileId").html()),
	render: function(){

		this.$el.html(this.template(this.model.toJSON()));
		console.log(this.model.toJSON());
		console.log("inside iternalView's render function");
		return this;
	},
	updateElement: function(){
		alert("model changed");
	}
});

var DirectionModel = Backbone.Model.extend({
	direction: "noDirection"	
});
	
var ArrowsView =  Backbone.View.extend({
	// el: '#arrows',	
	tagName: 'div',	
	template: _.template($("#arrowTempl").html()),
	render: function(){
		console.log("inside render funciton of arrows view")
		this.$el.append(this.template());	
		return this;
	},
	initialize: function(){
		this.$el.attr({id: 'arrows'});
		this.render();
	}
});

		var tileCollection = new TileCollection([
			{tile_content: 0,div_id:"tile1"}, {tile_content: 0,div_id :"tile2"}, {tile_content: 0,div_id:"tile3"}, {tile_content: 0,div_id :"tile4"}, 
			{tile_content: 0,div_id:"tile5"}, {tile_content: 0,div_id :"tile6"}, {tile_content: 0,div_id:"tile7"}, {tile_content: 0,div_id :"tile8"},
			{tile_content: 0,div_id:"tile9"}, {tile_content: 0,div_id :"tile10"}, {tile_content: 0,div_id:"tile11"}, {tile_content: 0,div_id:"tile12"},
			{tile_content: 0,div_id:"tile13"}, {tile_content: 0,div_id:"tile14"}, {tile_content: 0,div_id:"tile15"}, {tile_content: 0,div_id:"tile16"}, 

		]);

var GameView = Backbone.View.extend({
		el: '#gameContainer',
	events:{
		"click #left": 'buttonArrowHandler'
	},
	renderBoard:function(){
		var tileBoardView =  new TileBoardView({collection:this.collection});
		this.$el.append(tileBoardView.el);
	},
	initialize: function(){
		this.collection = this.options.collection;
		this.renderBoard();	
		this.renderControls();	
		_.extend(this,Backbone.Events);
		this.on("changeCollection",function(msg){
			alert("changeCollection");	
		},this);

	},
	renderControls:function(){
		var arrowsView = new ArrowsView(); 
		this.$el.append(arrowsView.el);
	},
	buttonArrowHandler: function(){
		this.trigger("changeCollection");
	}
});
var gameView = new GameView({ collection: tileCollection,arr_id: 'arrows'});
