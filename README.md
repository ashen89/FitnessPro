# FitnessPro
<div align="center">

# [FitnessPro](https://peaceful-eyrie-17275.herokuapp.com/)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fyelpcamp.app)
![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fwww.yelpcamp.app)
[![Maintainability](https://api.codeclimate.com/v1/badges/5db672c308be3e556462/maintainability)](https://codeclimate.com/github/JacobGrisham/YelpCamp/maintainability)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/6272d48144774479b06e9b4b2caea0d6)](https://www.codacy.com/manual/JacobGrisham/YelpCamp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JacobGrisham/YelpCamp&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/6272d48144774479b06e9b4b2caea0d6)](https://www.codacy.com/gh/JacobGrisham/YelpCamp/dashboard?utm_source=github.com&utm_medium=referral&utm_content=JacobGrisham/YelpCamp&utm_campaign=Badge_Coverage)
[![CircleCI](https://img.shields.io/circleci/build/github/JacobGrisham/YelpCamp)](https://app.circleci.com/pipelines/github/JacobGrisham/YelpCamp)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/jacobgrisham/YelpCamp)
![GitHub all releases](https://img.shields.io/github/downloads/jacobgrisham/yelpcamp/total)
 </div>

## 🛠 Technologies
|Front-End	|Back-End	|Database	|Deployment		|
| ------- 	| ------ 	| ------ 	| --------		| 
|HTML5	 	|Node.js 	|Mongoose	|Heroku	  		|
|CSS3	 	|ExpressJS	|MongoDB	|MongoDB Atlas	|
|Bootstrap 5	|EJS	  	|.		    |Git		|
|Javascript	|.		  	|.		    |.	      	|

## ⚖️ Methodology
-	[Bootstrap 5](https://getbootstrap.com/) as the CSS framework to keep the UI simple and quick to build. Since the website takes a performance hit for loading Bootstrap, took full advantage of advanced Bootstrap features such as [custom validation](https://getbootstrap.com/docs/5.0/forms/validation/) for all forms and [animated form input](https://getbootstrap.com/docs/4.0/examples/floating-labels/) for the login and register pages.
-	[Express.js](https://expressjs.com/) as the Node.js application framework since it's a lightweight framework, which is ideal for gaining an understanding of how to build the backend from scratch. Compared to a framework like [Nest.js](https://nestjs.com/) or even [Django](https://www.djangoproject.com/), Express.js doesn't have many features out of the box.
-	[PassportJs](https://github.com/jaredhanson/passport) for the authentication and authorization.
-	NoSQL database for the flexibility compared to a SQL database, [MongoDB](https://www.mongodb.com/) in particular because of its prevalence in the industry.
-	[Embedded Javascript Templates (EJS)](https://ejs.co/) as the front-end templating language for more DRY code compared to plain HTML and for dynamic user-experiences. This is a simple templating language, similar to [Jinja](https://jinja.palletsprojects.com/en/3.0.x/) for Python. Both however fall short on front-end scalability, modularity, and performance compared to a framework like [React](https://reactjs.org/). Working with simple templating languges helps to remind me the benefits of working with a framework like React.
-	[Heroku](https://www.heroku.com/) as the cloud hosting provider to gain experience with PaaS. Since I'm using the free tier, which normally causes the application to sleep after 30 minutes of inactivity, the application is kept awake from 6:00 a.m. to 11:59 p.m. PST with [Kaffeine](https://kaffeine.herokuapp.com/).
-	[Cloudinary](https://cloudinary.com/) as the Content Delivery Network to serve users outside of the U.S. with faster load times and for the free SSL certificate.


## ⚙️ Features
-	Login, sign-up, Admin role
-	RESTful routes (Create, Read, Update, Delete) for campgrounds, comments, and reviews
-	Create and Update forms have both client-side and server-side validation
-	Create routes have authentication
-	Update, and Delete routes have authentication and authorization
-	[Google Maps API](https://developers.google.com/maps/documentation)
