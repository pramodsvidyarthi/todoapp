require.config({
	baseUrl:'/public/',
	paths:{
		"jquery":"/assets/jquery/dist/jquery",
		"backbone":"/assets/backbone/backbone",
		"underscore":"/assets/underscore/underscore",
		"localstorage":"/assets/backbone.localstorage/backbone.localstorage",
		"jqueryui":"/assets/jquery.ui/ui/sortable",
		"core":"/assets/jquery.ui/ui/core",
		"widget":"/assets/jquery.ui/ui/widget",
		"mouse":"/assets/jquery.ui/ui/mouse"
	},
	shim:{
		"backbone":{
			deps:["jquery","underscore"],
			exports:"Backbone"
		},
		"localstorage":{
			deps:["backbone"],
			exports:"localstorage"
		},

		"jqueryui":{
			deps:["jquery","core","widget"]
		}
	}
	 
});

require(["Collection/todocollection","Views/collectionview","jqueryui"],function(taskscol,listview){

	var abc = new taskscol();
	//abc.create();
	// abc.addone("go to temple");
	// abc.fetch();
	// console.log(abc);
	// console.log(abc);
	// abc.each(function(model){
	// 	// console.log(model.get('title'));
	// 	if(model.get('title') === "go to office"){
	// 		model.set('title','go to bed')
	// 	}
	// 	console.log(model.get('title'));
	// });

	// abc.model.get('')

	 $('#list').sortable({
        stop: function(event, ui) {
            ui.item.trigger('drop', ui.item.index());
        }
    });

	var xyz = new listview({collection:abc});

})

