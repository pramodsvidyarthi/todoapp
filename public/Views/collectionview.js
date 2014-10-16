define(["backbone","Views/defaultview","Views/footerview"],function(Backbone,defaultview,footerview){
	var collectionview = Backbone.View.extend({
		el:$('#content'),
		// id:'list',
		events:{
			'keypress #newtodo':'additem',
			'click #selectall':'selectAll',
			'update-sort': 'updateSort',
			'bulkdelete':'deleted'			//evnt can be triggered on collection nd on the element if on element the
										   //mention here. if on a model or collection mention in initialize using listenTo.
		},

		initialize:function(){
			var vent = _.extend({},Backbone.events);
			this.showlabel();
			this.addAll();
			this.render();
			this.listenTo(this.collection,'add',this.addOne);
			this.listenTo(this.collection,'remove',this.showlabel);
			this.listenTo(this.collection,'reset',this.addAll);
			this.listenTo(this.collection,'change',this.render);
			this.listenTo(this.collection,'delmodel',this.deleted);
			// $('#content').append(this.$el);
			

		},

		additem:function(e){
			if(e.keyCode !== 13) return;
			if(!$('#newtodo').val()) return;
			this.collection.create({ title:$('#newtodo').val(),order:this.collection.nextOrder() });
			$('#newtodo').val('');

		},

		addOne:function(todo){
			var todoview = new defaultview({model:todo});
			this.$('#list').append(todoview.el);
			this.showlabel();
		},

		addAll:function(){
			this.collection.each(this.addOne,this);
		},

		render:function(){
			// do things pertaining to footer
			var done = this.collection.where({completed:true}).length;
			// console.log(done);
			var remaining = this.collection.where({completed:false}).length;
			// console.log(remaining);
			new footerview({collection:this.collection});
		},

		showlabel:function(){
			this.render();
			if(this.collection.length){
				$('#selectall')[0].checked = false;
				$('.lead').addClass('showlabel');
				$('#footer').addClass('show');
			} else {
				$('.lead').removeClass('showlabel');
				$('#footer').removeClass('show');
			}
		},

		selectAll:function(e){
			//best way to do rather than the way done in defaultview make use of event target
			if(e.target.checked){
				this.collection.each(function(model){ model.save({ completed:true })});
			} else {
				this.collection.each(function(model){ model.save({ completed:false })});
			}
		},

		updateSort: function(event, model, position) {            
        // this.collection.remove(model);

        // this.collection.each(function (model, index) {
        //     var order = index;
        //     if (index >= position)
        //         order += 1;
        //     model.set('order', order);
        // });            
        
        // model.set('order', position);
        // // this.collection.add(model, {at: position});
        
        // to update ordinals on server:
        // var ids = this.collection.pluck('id');
        // $('#post-data').html('post ids to server: ' + ids.join(', '));
        
        // this.render();
    },

    deleted:function(model){
    	// var num = model.get('order');
    	
    		this.collection.each(function(model,index){
    			model.save({order:index});
    		})
    	
    }


	});
	return collectionview;
});