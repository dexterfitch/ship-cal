<script type="text/javascript">//<![CDATA[
	$(function() {
		var clientKey = "js-oAqJztTH2mscVxjVfhuL3PMVzuEXiX2Gytq7WkOYHhaCOuy3L3POSCKr6popmr6V";

			var zipcode1 = this.startingZip;
			var zipcode2 = this.destinationZip;

			var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/distance.json/" + zipcode1 + "/" + zipcode2 + "/mile";

			var distance = null;

			$.ajax({
				url: url,
				dataType: "json"
				success: function(data) {
					distance = data.distance
					distance = data.find("div.distance")
				}
			});




<script type="text/javascript">//<![CDATA[
	$(function() {
		// IMPORTANT: Fill in your client key
		var clientKey = "js-oAqJztTH2mscVxjVfhuL3PMVzuEXiX2Gytq7WkOYHhaCOuy3L3POSCKr6popmr6V";

		var cache = {};
		var container = $("#example2");
		var errorDiv = container.find("div.text-error");

		/** Handle successful response */
		function handleResp(data)
		{
			// Check for error
			if (data.error_msg)
				errorDiv.text(data.error_msg);
			else if ("distance" in data)
			{
				// Show div
				container.find("div.distance").show()
				// Set distance
				.find("span.distance").text(data.distance + " miles");
			}
		}

		// Set up event handlers
		container.find("input[name='zipcode1'],input[name='zipcode2']").on("keyup change", function() {
			// Get zip code
			var zipcode1 = $("input[name='zipcode1']").val().substring(0, 5);
			var zipcode2 = $("input[name='zipcode2']").val().substring(0, 5);
			if (zipcode1.length == 5 && /^[0-9]+$/.test(zipcode1) && zipcode2.length == 5 && /^[0-9]+$/.test(zipcode2))
			{
				// Clear error
				errorDiv.empty();

				// Check cache
				var cacheKey = zipcode1 + '-' + zipcode2;
				if (cacheKey in cache)
				{
					handleResp(cache[cacheKey]);
				}
				else
				{
					// Build url
					var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/distance.json/" + zipcode1 + "/" + zipcode2 + "/mile";

					// Make AJAX request
					$.ajax({
						"url": url,
						"dataType": "json"
					}).done(function(data) {
						handleResp(data);

						// Store in cache
						cache[cacheKey] = data;
					}).fail(function(data) {
						if (data.responseText && (json = $.parseJSON(data.responseText)))
						{
							// Store in cache
							cache[cacheKey] = json;

							// Check for error
							if (json.error_msg)
								errorDiv.text(json.error_msg);
						}
						else
							errorDiv.text('Request failed.');
					});
				}
			}
		}).trigger("change");
	});
//]]></script>
