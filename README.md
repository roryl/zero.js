#Zero.js - Instant Ajax Applications
Using zero.js, build ajax rich, progressively enhanced web applications, using server side rendering and no additional javascript. Zero.js makes building web applications fun again!

##What Zero.js Does
Zero.js enhances native HTML 5 forms and anchor links by intercepting certain POSTs and GETs, and dynamically updating the expected changed elements on the page, all without using push-state or breaking native browser URls and history functionality. It preserves traditional server side URL routing while giving a smooth ajax experience.

##When to use it
Use Zero.js for applications that are server-side routed and rendered. Zero.js allows you to keep the stability, security and flexibility of a server side stack while having the user experience of a java script client rendered application. Zero.js works with any existing server side rendered application and does not require your server app to be aware of the client side view concerns (thus no need to server side template partials or fragments).

###Zero.js Philosophies
The following web app architecture philosophies underpin Zero.js. If you believe in these then Zero.js may work for you:

###URLs are important
Most modern javascript applications abuse and break URLs, either by ommiting the route information entirely, or not proprly handling them unless the user explicity clicked through to the route. We believe that URLs should be sharable, indexible, and convery meaning to the user experience.

###Don't break browser features
Many javascript libraries break form and link funtionality in browsers by using javascript links that do not route to any page, cannot be opened in new windows, and cannot be copied. Many libraries also break the browser history or rely on flaky push-state implementations. We believe that all currently used HTML 5 browsers have the functionality necessary to create rich client experiences without resorting to a complete javascript application.

###Javascript fatigue is real
The churn in the javascript application ecosystem is absurd and does not support end users needs, or the needs of customers and developers trying to build web applications. Having to compeltely rebuild a web interface every few years or risk becoming obselete is not an appropriate lifecycle for most web applications. We believe that HTML & Native browser functionaltiy, with judicial javascript use, is more easily maintained long term and a proper separation of concerns.

##When NOT to use it
Becasue zero.js is for server-side rendered applications, it provides nothing of value for completely javascript rendered applications. The vast majority of applications however, even many dyanmic applications, do not need to be javascript rendered and can be more maintainably built with server side rendering. Give Zero.js a try to see if it gives you the right user experience for your app. But if your app needs true full javascript rendering, don't use Zero.js.




