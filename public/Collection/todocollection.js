define(["Model/todomodel","localstorage"],function(todomodel,LocalStorage){
	var tasks = Backbone.Collection.extend({
		model:todomodel,
		localStorage:new Backbone.LocalStorage("todostorage"),
		initialize:function(){
			// this.create();
			this.fetch();
		},

		edit:function(val){
			this.model.save({
				title:val
			});
		},

		addone:function(val){ 
			this.create({
				title:val,
				completed:false,
				order:this.nextOrder()
			});

		},

		comparator:'order',

		nextOrder:function(){
			if (!this.length) return 1;
      		return this.last().get('order') + 1;
		},

		removed:function(){
			console.log("model removed");
		}

	});
	return tasks;
})