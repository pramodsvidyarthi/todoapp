define(["backbone","Collection/todocollection"],function (Backbone,todocol) {
	var task =  Backbone.Model.extend({
		defaults:{
			title:"go to shop",
			completed:false,
			order:0
		},

		// edit:function(val){
		// 	this.save({
		// 		title:val
		// 	});
		// },

		initialize:function(){

		},

		// add:function(val){ 
		// 	this.save({
		// 		title:val,
		// 		completed:false
		// 	});
		// },

		toggledone:function(){ 
			this.save({ 
				completed:!this.get("completed")
			})
		}

	});

	return task;
})