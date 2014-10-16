define(["backbone","text!template/footer.html"],function (Backbone,footer) {
	var footerview = Backbone.View.extend({
		template:_.template(footer),
		el:'#footer',
		events:{
			'click .clear':'delete'
		},

		initialize:function(){
			// console.log(this.collection);
			this.render();
		},

		render:function(){
			var done = this.collection.where({completed:true}).length;
			var remaining = this.collection.where({completed:false}).length;
			this.$el.html(this.template({done:done,remaining:remaining}));
		},

		delete:function(){
			var done = this.collection.where({completed:true});
			_.each(done,function(model){
				model.destroy();
			});
			this.$el.trigger('bulkdelete');
		}
	});

	return footerview;
});