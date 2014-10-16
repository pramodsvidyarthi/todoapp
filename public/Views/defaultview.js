define(["text!template/defaulttemplate.html","backbone"],function(defaulttemplate,Backbone){
	var todoview = Backbone.View.extend({
		tagName:'li',
		events:{
			'click #check':'selected',
			'mouseover':'showdelicon',
			'mouseout': 'hideicon',
			'mouseenter a.destroy':'darkenicon',
			'mouseout a.destroy':'fadeicon',
			'dblclick em':'edit',
			'click a.destroy':'removemodel',
			'blur #largebox':'closeedit',
			'keyup #largebox':'updateOnEnter',
			'drop':'drop'
		},

		template:_.template(defaulttemplate),

		initialize:function(){
			// console.log(this.$el.html(defaulttemplate));
			// console.log(this.template);
			this.render();
			this.checkboxtick();
			this.listenTo(this.model,'change:completed',this.checkboxtick);
			this.listenTo(this.model,'change:title',this.render);
			this.listenTo(this.model,'destroy',this.remove);
			// $('body').append(this.$el);
			// console.log(this.$el); //this logs the 'li' element wit all its children
		},

		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		 drop: function(event, index) {
        	this.$el.trigger('update-sort', [this.model, index]);
    	},

		selected:function(){
			// alert("hi");
			this.model.toggledone();
			// alert(this.model.get('completed'));
		},

		checkboxtick:function(){
			if(this.model.get('completed') === true){
				 // in the li find the innerhtml's and store it in a var a
				// var a = $(this.$el)[0];		
				// find and filter methods of jquery will help
				//inside a look for the input tag with id check and change its attribute to checked..							
				//first did it as the commented line below but its not the right way to do it
				// $(a).find('#check').attr('checked','checked'); 	
				this.$el.find('#check')[0].checked = true;
				this.$el.find('em').addClass('selected');
			} else {
				this.$el.find('em').removeClass('selected');
				this.$el.find('#check')[0].checked = false;
			}
		},

		showdelicon:function(e){
			// this.$el.addClass('showicon');
			// console.log(this.$el.find('a .destroy'));
			e.preventDefault();
			this.$el.find('a.destroy').css('display','block');
			
		},

		hideicon:function(e){
			this.$el.find('a.destroy').css('display','none');
		},

		darkenicon:function(e){
			var t = e.target;
			$(t).css({
				'background-position':'0 -20px',
				'display':'block'
			});
		},

		fadeicon:function(e){
			var t = e.target;
			$(t).css({
				'background-position':'0px 0px',
				'display':'block'
			});
		},

		edit:function(){
			var self = this;
			//chaining events find checkbox and show it and fill its value wit model's value and then focus the text box
			this.$el.find('#largebox').css('display','block').val(this.model.get('title')).focus();
			// was trying to find a way for click evnt outside the txtbox not() is to omit and dom element from selection
			//but the right way is blur event, it it triggered wen a inputbox loses focus

			// var ele = $('#content:not(#largebox)');
			// $(ele).on('click',function(){
			// 	self.$el.find('#largebox').css('display','none');
			// })
		},

		closeedit:function(){	
			this.$el.find('#largebox').css('display','none');
		},

		removemodel:function(){
			this.model.trigger('delmodel',this.model);
			this.model.destroy();
		},

		updateOnEnter:function(e){
			// if(e.keyCode !== 13 || 27) return;
			if(e.keyCode === 13){
				var value = this.$el.find('#largebox').val();
				if(value === this.model.get('title') || !value){
				console.log('not saved');
				this.$el.find('#largebox').css('display','none');
			} else {
				this.model.save({title:value});
				console.log('saved');
				this.$el.find('#largebox').css('display','none');
			}
		} 
			 if(e.keyCode === 27){
				this.$el.find('#largebox').css('display','none');
			}
		}

	});

	return todoview;
})