/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Rory Laitila
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS 
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
$(document).ready(function() {

	var lastButtonClickedValue = {};

	var zeroAjax = function(html){
		var zeroForms = $(html).find('form[zero-target]');
		$(zeroForms).off('submit');

		for(var i=0 ; i < zeroForms.length; i++){

			var action = $(zeroForms[i]).attr('action');
			var goto = $(zeroForms[i]).find('input[name=goto]').val();
			var currentPath = window.location.pathname;
			
			
			var gotoAndCurrentPathAreTheSame = true;
			// var gotoAndCurrentPathAreTheSame = (goto == currentPath);
			
			if(gotoAndCurrentPathAreTheSame){
				$(zeroForms[i]).on('submit',function(event){
					event.preventDefault();
					// console.log(event);

					var form = $(event.target);
					var target = form.attr('zero-target');
					var formButton = $(form).find('button');					
					var icon = $(formButton).find('i');
					// console.log(icon.hasClass('fa'));

					var oldClass = icon.attr('class');

					if(icon.hasClass('fa-refresh')){
						icon.addClass('fa-spin');						
					} else {
						icon.removeClass();
						icon.addClass('fa fa-circle-o-notch fa-spin');
					}

					formButton.attr('disabled', true);

					// var data = form.serialize();
					// console.log(data);

					// Use Ajax to submit form data. Add the button value to the submit					
					formData = form.serializeArray();					
					formData.push(lastButtonClickedValue);

					/*
					Check if the last button clicked had a formaction. This is a HTML5
					feature to send forms to a different URL. If so, this needs to override the
					form's action. There is no way in Javascript cross browser, to get the
					button's formaction from the onSubmit event.
					 */
					
					if(typeof lastButtonClickedElement != 'undefined' && lastButtonClickedElement){
						var buttonHasFormAction = $(lastButtonClickedElement).attr('formaction');
						if(typeof buttonHasFormAction != 'undefined' && buttonHasFormAction){
							var formAction = buttonHasFormAction;
						} else {
							var formAction = form.attr('action');
						}											
					} else {
						var formAction = form.attr('action');
					}

		            $.ajax({
		                url: formAction,
		                type: 'POST',
		                data: formData,
		                success: function(result) {
		                    
		                    //http://stackoverflow.com/questions/405409/use-jquery-selectors-on-ajax-loaded-html
		                    //
		                    
		                    // http://stackoverflow.com/questions/14423257/find-body-tag-in-an-ajax-html-response
		                    if(target == 'body'){
		                    	var targetHTML = result.substring(result.indexOf("<body>")+6,result.indexOf("</body>"));
								targetPut = $('body');		                    
		                    	targetPut.html(targetHTML);
		                    } else {
		                    	// console.log(result);
		                		var response = $('<html />').html(result);
		                		// console.log(response);
		                    	var targetHTML = $(response).find(target);
		                    	// console.log(targetHTML);
		                    	targetPut = $(target);
		                    	if(!targetPut.length){
		                    		throw "Could not find the target " + target + " check your references and ensure it exists";
		                    	}
		                    	// console.log(targetPut);		                    
		                    	targetPut.html(targetHTML.html());
		                    	
		                    	formButton.removeAttr('disabled');                    	
		                    }

		                    icon.removeClass();
		                    icon.addClass(oldClass);
		               
		                    //Call zeroAjax over the document again to add event listeners
		                    zeroAjax($(document));
		                    zeroAuto($(document));
		                    zeroOnChange($(document));
		                    lastButtonClicked($(document));
		                    // console.log(targetHTML);
		                }
		            });
				})
			}
		}
		
	}
	zeroAjax($(document));

	var lastButtonClicked = function(html){
		lastButtonClickedValue = {};
		var formButtons = $(html).find('button,input[type="submit"]');
		formButtons.each(function(index, button){
			$(button).on("click",function(element){
				lastButtonClickedElement = this;
				lastButtonClickedValue = { name: this.name, value: this.value };
				console.log(lastButtonClickedValue);
			})
		});
		// console.log(formButtons);
	}
	lastButtonClicked($(document));	


	zeroAuto = function(html){

		var zeroAutos = $(html).find('form[zero-auto]');
		// $(zeroAutos).off('submit');
		// console.log(zeroAutos);
		for(var i = 0; i < zeroAutos.length; i++){

			var auto = zeroAutos[i];
			
			var formButton = $(auto).find('button');
			var icon = $(formButton).find('i');
			// console.log(icon.hasClass('fa'));

			if(icon.hasClass('fa-refresh')){
				icon.addClass('fa-spin');						
			} else {
				icon.removeClass();
				icon.addClass('fa fa-circle-o-notch fa-spin');
			}

			// console.log(auto);
			var timeout = $(auto).attr('zero-auto');
			setTimeout(function(){
				$(auto).trigger("submit");
			}, timeout * 1000)
		}

	}
	zeroAuto($(document));

	zeroOnChange = function(html){

		zeroForms = $(html).find('form[zero-submit-onchange');
		console.log(zeroForms);
		for(var i=0; i < zeroForms.length; i++){
			var zeroForm = zeroForms[i];

			var inputs = $(zeroForm).find('input,select,textarea');
			for(var i2=0; i2 < inputs.length; i2++){

				var input = inputs[i2];
				// console.log(input);
				$(input).on("change", function(){
					// console.log('change');
					$(zeroForm).trigger("submit");
				})

			}

		}

	}
	zeroOnChange($(document));

});