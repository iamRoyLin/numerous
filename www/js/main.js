var app = {
    initialize: function() {
		globals.nativeAlert("hi");
	

			
		$.ajax({
			url:"views", // relative path to www folder
			type:"get",
			contentType:"application/text",
			context:this,
			success: function(text){
				globals.nativeAlert(text);
			}
		});
		/*
		
        this.store = new MemoryStore();
		new LoginView(this.store);
		*/
    }
	
	

	
};

app.initialize();