$("<style type='text/css'>  </style>").appendTo("head");

jQuery(document).ready(function() {											
	setTimeout(function(){
		console.log('add animate classes'); 										
		jQuery('.zero-squeeze-in').addClass('zero-squeeze-in-on');
		jQuery('.zero-squeeze-out').addClass('zero-squeeze-out-on');
	}, 5);

});