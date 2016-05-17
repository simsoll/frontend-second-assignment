# Introduction 
This document is part of the second mandatory assignment in the course Front-end Development held in Spring 2016 at BAAA - Business Academy Aarhus.
* Link to source code on GitHub
* Link to Heroku app

# Case description
* Is this okay to include?

## User Persona
Julie 23, single, studying Media Science, lives in Aarhus, wants to live in Copenhagen, Northside-fan, listens to P6 Beat (indie cool), changes for P3 (mainstream), when alone. Loves Instagram, just began on Snapchat, reads Danish fashion blogs, reads eb.dk for news, Zulu & DR3 as flow tv, has iPhone 5s, watches House of Cards, because people say it’s cool, watches Game of Thrones, because she loves it & read all of the Harry Potter books. 

## Designer Persona
Peter 28, single, graduate from London School of Arts as Illustrator, lives in New York, illustrated his first children's book, been at Hummel as tshirt print designer, pursuing career as professional street artist. Got prints chosen on Threadless.com, has his own webshop with t-shirts he sell through Spreadshirt.

# Design requirements
Create a Style Guide for the public website to Squares. The Style Guide must include:

* Target group description based on the personas acquired by Kong Orange. Comment on the personas and the target group they hint at. What values do they possess etc.?
* A colour palette with examples of colours and an explanation of your choices.
* Your choice of Font and an explanation of your choices.
* A Gestalt sketch and description of composition. Explain why you chose to organise your site in this particular way, knowing what you do about users and functionality.
* Explain how your design choices supports the sites content.

# Technical requirements
You have to utilize technologies from the front end course: HTML5, CSS3, CSS preprocessor (i.e. Sass) and JavaScript. Using jQuery and jQuery plugins is voluntary and you are allowed to use a CSS framework like Bootstrap. It is also voluntary to use automation tools like ex Gulp. You are allowed to use JavaScript frameworks like AngularJS.

In the report, you must document and explain how the following elements are used in your solution:
* Semantic HTML
* CSS3 and use of CSS preprocessor
* Central JavaScript algorithms
* Possible use of CSS framework
* Possible use of jQuery and arguments for use of possible plugins
* Possible use of JavaScript framework, i.e. AngularJS
* Possible use of automation tools, i.e. Gulp
* Browser compatibility
* Validation of HTML and CSS

# SQUARES
This section will shortly describe how the SQUARES business case is interpreted and how it will be supported by the website.

Everyone will be able to upload square sets to SQUARES - the only requirement is that you need to be logged in, as square sets are uploaded through the profile page and every square set will be linked to a user account. The poorly designed square sets will be filtered out using a rating system. For this prototype the rating system will be rather simple, but will ensure that the highest rated square sets and artworks will be shown first.

The users of SQUARES will be incentivized to upload quality looking square sets, as this is the only way people can make a profit on SQUARES. Whenever someone buys a product in the shop (a poster, t-shirt, physical cardboard pieces, etc.) with one of the artworks on SQUARES, the money left after covering expenses will be distributed between SQUARES and the user that created the underlying the square set. It doesn't make sense to give any contributions to the creator of the artwork, as it's easy on SQUARES to create artworks based on already completed artworks, so the artwork gallery will likely be floated with copies of high quality artworks. 

The shop will not be implemented in this prototype, but the idea is to have a shop where its transparent what the square set creator will earn on the purchase. Furthermore, donations to the square set creator should also be possible through the shop by letting the buyer choose the price (a minimum price, a maximum price and a suggested price should be predefined for each product). This could also incentivize new designers to upload square sets as their earning potential is visible. This type of shop can for instance be found on https://leanpub.com.

# Style Guide
The style guide presented here will cover the main design choices for the website. The overall theme will be to use squares in the design thereby supporting both the title of the website but also the business concept - combining squares to produce squared artworks.

## Target group
Taking the user persona into account the user target group consists of people that want to signal to their surroundings that they are cool and up-to-date with the newest trends, but inside are struggling to find their own true individuality. They know how to handle a smart-phone but are still considered to be non-technical people.   

Looking at the designer persona this part of the overall user group is quite different from the part described by the user persona and discussed above. They tend to be a bit more mature and business-minded, as they are not on a pursuit for finding their own individuality (they have found it), but are looking for something that can help them succeed with the career ambitions. They are discerning, as they easily can distinguish a well thought-out product from a poorly designed product. Additionally, they are considered professionals within their field of work.

To support these personas the design should be simple and intuitive so non-technical people can navigate the website and easily find square sets and produce artworks that they envision. Furthermore, the website should accommodate the picky designer that has a sense of what good design is.

## Color Scheme
* A colour palette with examples of colours and an explanation of your choices.

## Typeface
* Your choice of Font and an explanation of your choices.

## Gestalt principles
* A Gestalt sketch and description of composition. Explain why you chose to organise your site in this particular way, knowing what you do about users and functionality.

## Wrap up 
* Explain how your design choices supports the sites content.

# Technical Considerations
In the report, you must document and explain how the following elements are used in your solution:
* Semantic HTML
* CSS3 and use of CSS preprocessor
* Central JavaScript algorithms
* Possible use of automation tools, i.e. Gulp
* Browser compatibility
* Validation of HTML and CSS
* list all external libraries


## Frameworks
The SQUARES prototype uses a both a CSS framework and a JavaScript framework to simplify some a lot of the development tasks thereby greatly shortening the development time. Bootstrap and AngularJS has been taught during the course, so these frameworks will be used developing the SQUARES prototype.  

### Bootstrap 
Good for fast prototyping, which has been the case here. If going further with the project it would make sense to stop using Bootstrap and instead build the website with custom-made styling creating a unique look and feel.

### AngularJS
* why AngularJS? 
* Why components based?
 * a few central concepts (a square set, an art work, etc.) that can be built once
* Sharing is important - need proper routing for that to work

## Libraries
* pros/cons
* alternatives?

The SQUARES prototype uses a few external libraries making some of the complex challenges more easy to solve and in far less time.

### Canvas

Pure AngularJS using directives and mousedown, mouseup and mouseover events
* very limited functionality

codef0rmer: jQuery drag and drop made easy in AngularJs
* very simple drag and drop
* still a bit limited

interactjs
* drag and drop
* resizing
* multi-touch gestures
* snapping/grid
* excellent documentation

### State compression
As on http://paletton.com/.

* simple base64 encoding
* ls-string
* further optimizations?
 * uglification (need to implement own mappers, as de-uglification is needed)

### HTML to image

### Square set upload


# Future improvements
