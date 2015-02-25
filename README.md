# Native Plants Web Service
By: Carolyn Velez and Diane Zevenbergen


#### Demo
http://web-students.net/site2/Sandbox/Plant_Web_Service/


#### Overview
The demo page uses AJAX to retrieve and parse one of two JSON files. Click on SIZE to display plants from largest to smallest, or click DIFFICULTY to display plants from easiest to most difficult to grow.

![Site Navigation]
(http://jscript.carolynvelez.com/200/week-07/__resources/plants-web-service-resources/site-01.jpg)


#### Results

![Site Results]
(http://jscript.carolynvelez.com/200/week-07/__resources/plants-web-service-resources/site-02.jpg)


#### Directory Structure
The Plant_Web_Service folder contains an images folder for all images and a data folder for two JSON files.  All HTML, CSS, JavaScript and PHP files are located in the root of the folder, as shown below:

![File Structure]
(http://jscript.carolynvelez.com/200/week-07/__resources/plants-web-service-resources/files-01.jpg)


#### JSON File Format
The data folder contains two JSON files that store similar arrays of plant information for the same 21 plants, sorted as follows:
-	Easiest to most difficult to grow:  PlantsEasiestToGrow.JSON 
-	Tallest to shortest: PlantsBySize.JSON

A portion of PlantsBySize.JSON is shown below.  Note that the property titled King_county_link provides additional information on each plant and the photo_link identifies the web site where the photo was obtained.

```javascript
  {
    "type":"Tree",
    "common_name":"Douglas-fir",
    "King_county_link":"https://green2.kingcounty.gov/gonative/Plant.aspx?Act=view&PlantID=6",
    "latin_name":"Pseudotsuga menziesii",
    "exposure":"sun - part shade",
    "moisture":"dry - moist",
    "height_ft":250,
    "availability":"generally available",
    "ease":"hardy plant - tough to kill!",
    "photo":"dougfir.jpg",
    "photo_link":"http://www.extension.iastate.edu/forestry/iowa_trees/trees/douglas_fir.html",
    "photo_credit":"ISU Forestry Extension"
  },
```


#### HTML Content
The index.html file includes list items that contain links for the two JSON files.  The links are accessed when a user selects SIZE or DIFFICULTY in the web page demo. Note that the href property is referenced in JavaScript code shown in the next section.

```html
	<nav>
		<ul>
			<li>Sort by:</li>
			<li><a href="plants-by-size" class="category" value="Largest to Smallest">Size</a></li>
			<li><a href="plants-easy-to-grow" class="category" value="Easiest to Most Difficult to Grow">Difficulty</a></li>
		</ul>
	</nav>
```


#### JavaScript: Click Function and loadAJAX Function
JavaScript: Click Function and loadAJAX Function
The following click function is called when either of the list items shown above is selected.  Note that the value of the href attribute is assigned to the variable cat (for category) and then passed to the function named loadAJAX.

```javascript
	$('.category').click(function (e) {
		//stop default action of the link
		e.preventDefault();

		//Get category from URL
		var cat = $(this).attr("href");

		//Get description for header from value attribute
		var description = $(this).attr("value");

		// Change heading
		$('#plants').html('<h2 id="head">' + description + " Plants</h2>");

		loadAJAX(cat);  //load AJAX and parse JSON file
	});
```

#### The loadAJAX function shown below executes the AJAX call.
```javascript
	function loadAJAX(cat) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "api.php?cat=" + cat,
			success: parseJSON,
		});
	}
```

#### API.PHP File
The AJAX call shown above will have a url value equal to "api.php?cat=plants-by-size" or "api.php?cat=plants-easy-to-grow".  This is loaded via GET to the api.php file (shown below) and data from the matching JSON file is retrieved. 

```php
	<?php
	if (isset($_REQUEST['cat'])) {
		switch ($_REQUEST['cat']) {
			case "plants-by-size":
				include('data/PlantsBySize.json');
				break;
	
			case "plants-easy-to-grow":
				include('data/PlantsEasiestToGrow.json');
				break;
			default:
				include('data/PlantsEasiestToGrow.json');
		}
	} else {
		echo "No parameter sent";
	}
```


#### JavaScript: parseData Function
After JSON data is successfully returned, the parseJSON function is executed.  (The success attribute in the AJAX call provides the name of the function that should run after successful return.)

```javascript
	function parseJSON(data) {
		$.each(data, function (i, item) {
	        var photo = '<div class="photo-wrap"><div class="photo" style="background-image:url(images/' + item.photo + ')" />';
	        photo += '<h5>Photo &copy; <a href="' + item.photo_link + '">' + item.photo_credit + '</a></h5></div></div>';
	
	        // Use text var for text info associated with plant
	        var text = '<strong>Common name:  </strong>' + '<span>' + item.common_name + '</span><br />';
			text += '<strong>Latin name:  </strong>' + '<span>' + item.latin_name + '</span><br />';
			text += '<strong>Moisture:  </strong>' + '<span>' + item.moisture + '</span><br />';
			text += '<strong>Exposure:  </strong>' + '<span>' + item.exposure + '</span><br />';
			text += '<strong>Ease of Growth:  </strong>' + '<span>' + item.ease + '</span><br />';
			text += '<strong>Height (ft):  </strong>' + '<span>' + item.height_ft + '</span><br />';
			text += '<p>' + '<a href="' + item.King_county_link + '">&raquo; More information through King County</a>' + '</p>';
	
			// Create div node, add photo and text info to it (from JSON data) and append it to #plants
			$('<div class="plant-module"></div>').html(photo + text).appendTo('#plants');
		});
	}
```