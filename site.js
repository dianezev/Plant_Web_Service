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
		var text = '<div class="photo" style="background-image:url(images/' + item.photo + ')" /></div>';
		text += '<strong>Common name:  </strong>' + '<span>' + item.common_name + '</span><br />';
		text += '<strong>Latin name:  </strong>' + '<span>' + item.latin_name + '</span><br />';
		text += '<strong>Moisture:  </strong>' + '<span>' + item.moisture + '</span><br />';
		text += '<strong>Exposure:  </strong>' + '<span>' + item.exposure + '</span><br />';
		text += '<strong>Ease of Growth:  </strong>' + '<span>' + item.ease + '</span><br />';
		text += '<strong>Height (ft):  </strong>' + '<span>' + item.height_ft + '</span><br />';
		text += '<p>' + '<a href="' + item.King_county_link + '">&raquo; More information through King County</a>' + '</p>';
//		text += '<img src="images/' + item.photo + '" alt="Picture of ' + item.commonname + '" align="right" />';

//				url("paper.gif");

		// Create li node, add text node to it (from JSON data) and append it to #plants
		$('<div></div>').html(text).appendTo('#plants');
	});
}
