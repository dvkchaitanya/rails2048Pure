// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
console.log("hello from sample.js");
//

var TileModel = Backbone.Model.extend({
	div_id: "sample"
});

var TileBoardView = Backbone.View.extend({
	el:	'#board',	
	render: function(){
		for (var i = 1; i <= 16; i++){
			this.addOneTile(i); 
		};
	},
	initialize: function(){
		this.render();
	},
	addOneTile: function(div_id_arg){
		tileModel.set({div_id: "tile"+div_id_arg});
		var tileView = new TileView({model:tileModel});
		this.$el.append(tileView.el);
	}
});

_.templateSettings = {
    evaluate    : /\{\{(.+?)\}\}/g,
    interpolate : /\{\{=(.+?)\}\}/g,
    escape      : /\{\{-(.+?)\}\}/g
}
//add tile template
var TileView =Backbone.View.extend({
	tagName: "div",
	initialize: function(){
		console.log("inside initialize function");
		this.model=this.options.model;
		this.$el.attr({id:this.model.get("div_id")});
		this.render();
	},
	template: _.template($("#tileId").html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		console.log(this.model.toJSON());
		console.log("inside iternalView's render function");
		return this;
	}
});

console.log(tileModel);
var tileModel = new TileModel({div_id:"123"});
var tileBoardView = new TileBoardView({model:tileModel});
