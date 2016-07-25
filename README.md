#Zero.js - Instant Ajax Applications
Using zero.js, build ajax rich, progressively enhanced web applications, using server side rendering and no additional javascript. Zero.js makes building web applications fun again!

##What Zero.js Does
Zero.js enhances native HTML 5 forms and anchor links by intercepting certain POSTs and GETs, and dynamically updating the expected changed elements on the page, all without using push-state or breaking native browser URls and history functionality. It preserves traditional server side URL routing while giving a smooth ajax experience.

##When to use it
Use Zero.js for applications that are server-side routed and rendered. Zero.js allows you to keep the stability, security and flexibility of a server side stack while having the user experience of a java script client rendered application. Zero.js works with any existing server side rendered application and does not require your server app to be aware of the client side view concerns (thus no need to server side template partials or fragments).

###Zero.js Philosophies
The following web app architecture philosophies underpin Zero.js. If you believe in these then Zero.js may work for you:

####URLs are important
Most modern javascript applications abuse and break URLs, either by ommiting the route information entirely, or not proprly handling them unless the user explicity clicked through to the route. We believe that URLs should be sharable, indexible, and convery meaning to the user experience.

####Don't break browser features
Many javascript libraries break form and link funtionality in browsers by using javascript links that do not route to any page, cannot be opened in new windows, and cannot be copied. Many libraries also break the browser history or rely on flaky push-state implementations. We believe that all currently used HTML 5 browsers have the functionality necessary to create rich client experiences without resorting to a complete javascript application.

####Javascript fatigue is real
The churn in the javascript application ecosystem is absurd and does not support end users needs, or the needs of customers and developers trying to build web applications. Having to compeltely rebuild a web interface every few years or risk becoming obselete is not an appropriate lifecycle for most web applications. We believe that HTML & Native browser functionaltiy, with judicial javascript use, is more easily maintained long term and a proper separation of concerns. In cases where a completely javascript rendered solution is necessary, it is usually only for a subset of an application, and it is better to reserve that portion for javascript frameworks.

####Forms and Links are the semantic web
Zero.js relies on applications which uses form posts, redirects, and links to resources, to convey the meaning of the application.


##When NOT to use it
Becasue zero.js is for server-side rendered applications, it provides nothing of value for completely javascript rendered applications. The vast majority of applications however, even many dyanmic applications, do not need to be javascript rendered and can be more maintainably built with server side rendering. Give Zero.js a try to see if it gives you the right user experience for your app. But if your app needs true full javascript rendering, don't use Zero.js.

##Dependencies
Zero.js requires jQuery and is tested with 2.2.4
https://code.jquery.com/jquery-2.2.4.min.js

##How it Works
The primary thing to understand about Zero.js is it works just like full normal browser page requests and refreshes. Zero makes full requests to your server side resources just like normal form posts and links would. Zero.js inspects the full response, and injects changed fragments into the page, under certain circumstances (described in the features section below). This means that you do not need to encode special HTML fragments in the server response. Your server returns full HTML like a normal browser request, and you tell Zero what to replace.

Zero also does not hide URL resources, unlike libraries which hide the URL and swap the body content and sometimes use push-state (Turbolinks, SmoothState.js, etc). When the URL changes by a link or post to a different URL than the current page, Zero.js will not intercept the call, and the browser will do a full reload to the new URL. Zero.js only intercepts calls where the URL resource is not changing. If the POST will result in a redirect back to a GET (Known as POST-REDIRECT-GET architecture), Zero.js provides a mechanism to define that the redirect will return to the current page, so that the desired fragments can be swapped.

###Server Side Routing Choices
Zero.js assumes that your server side routing architecture is made of resource endpoints. Zero.js assumes that a URL is a definite resource and that subsequent requests (GETs) to that resource return a relatively similar representation. It assumes that updates are made to that resource with POSTs. Resource based web applications will typically implement themselves in one of these two ways, which are compatible with Zero.js:

####POST-REDIRECT-GET
In this method, resource updates are achieved with form POSTs to a resource endpoint, and then the browser is redirected using a GET back to the updated resource endpoint. The POST never returns any data. This is the more modern RESTful resource architecture. 

####Self-Posting Forms
In this method, resource updates are achieved by posting to the same URL resources that the user is currently on. The server returns a full HTML page with the changes.

##Features
###Page Fragment Swap
The primary feature of Zero.js to to swap sections on a page with the request of the server response.

form-submit.html
```html
<html>
<head>
	<meta charset="UTF-8">
	<title>Basic HTML Form</title>
</head>
<body>
	<p id="form-message"></p>
	<form zero-target="#form-message" action="/form-response.html" method="post">
		<input type="hidden" name="goto" value="" />
		<button>Submit</button>
	</form>
</body>
</html>
```

form-response.html
```html
<html>
<head>
	<meta charset="UTF-8">
	<title>Basic HTML Form</title>
</head>
<body>
	<p id="form-message">You have submitted the form</p>
	<form zero-target="#form-message" action="/form-response.html" method="post">
		<input type="hidden" name="goto" value="" />
		<button>Submit</button>
	</form>
</body>
</html>
```

###Auto Reloading Fragments

###Auto Saving Forms





