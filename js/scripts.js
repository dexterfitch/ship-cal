$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();

    var length = parseInt($('input#length').val());
    var width = parseInt($('input#width').val());
    var height = parseInt($('input#height').val());
    var weight = parseInt($('input#weight').val());
    var startingZip = $('input#starting-zip').val();
    var destinationZip = $('input#destination-zip').val();



    var length = 5;
    var width = 6;
    var height = 7;
    var weight = 8;
    var startingZip = 97005;
    var destinationZip = 74104;

    var shipment = { length: length,
                     width: width,
                     height: height,
                     weight: weight,
                     startingZip: startingZip,
                     destinationZip: destinationZip,
                     distance: function() {
                       var clientKey = "oAqJztTH2mscVxjVfhuL3PMVzuEXiX2Gytq7WkOYHhaCOuy3L3POSCKr6popmr6V";
                       var zipcode1 = this.startingZip;
                       var zipcode2 = this.destinationZip;
                       var url = "https://www.zipcodeapi.com/rest/" + clientKey + "/distance.json/" + zipcode1 + "/" + zipcode2 + "/mile";

                        $.ajax({
                          url: url,
                          dataType: "json",
                          success: function(data) {
                            alert(data.distance);
                          }
                        });
                      }
                    };
                     shippingCost: function() {
                       var volume = this.length * this.width * this.height;
                       var cost = 0;

                       if (volume < 216) { // arbitrarily selected volume of a 6 x 6 x 6 box as small
                         cost += 8;
                       } else if (volume < 1728) { // arbitrarily selected volume of a 12 x 12 x 12 box as medium
                         cost += 16;
                       } else if (volume < 5832) { // arbitrarily selected volume of a 18 x 18 x 18 box as large
                         cost += 24;
                       } else {
                         cost += 50;
                       }

                       cost += (this.weight/2);
                     }
                   };

  });
});
