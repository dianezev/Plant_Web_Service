$(document).ready(function () {
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

	// Get year for copyright
	var currentYear = new Date();
	var getYear = currentYear.getFullYear();
	$("#copyright").text(getYear);
});

function loadAJAX(cat) {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "api.php?cat=" + cat,
		success: parseJSON,
	});
}

function parseJSON(data) {
	$.each(data, function (i, item) {
        // Carolyn:  Can you please help me figure out how to get the credit at the bottom of the photo? Thx.
        // Use photo var to create link/img/photo credits related to plant
        var photo = '<div class="photo" style="background-image:url(images/' + item.photo + ')" />';
        photo += '<h5>Photo &copy; <a href="' + item.photo_link + '">' + item.photo_credit + '</a></h5></div>';
        
        // Use text var for text info associated with plant
        var text = '<strong>Common name:  </strong>' + '<span>' + item.common_name + '</span><br />';
		text += '<strong>Latin name:  </strong>' + '<span>' + item.latin_name + '</span><br />';
		text += '<strong>Moisture:  </strong>' + '<span>' + item.moisture + '</span><br />';
		text += '<strong>Exposure:  </strong>' + '<span>' + item.exposure + '</span><br />';
		text += '<strong>Ease of Growth:  </strong>' + '<span>' + item.ease + '</span><br />';
		text += '<strong>Height (ft):  </strong>' + '<span>' + item.height_ft + '</span><br />';
		text += '<p>' + '<a href="' + item.King_county_link + '">&raquo; More information through King County</a>' + '</p>';
//		text += '<img src="images/' + item.photo + '" alt="Picture of ' + item.commonname + '" align="right" />';

//				url("paper.gif");
        
		// Create div node, add photo and text info to it (from JSON data) and append it to #plants
		$('<div></div>').html(photo + text).appendTo('#plants');
	});
}
