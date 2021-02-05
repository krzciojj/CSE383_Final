var URL1 = 'https://api.clearllc.com/api/v2/miamidb/_table/zipcode?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&ids=';
$(document).ready(function () {
    $("#form").submit((event) => {
        event.preventDefault();
        getLat();
    })
})

function getLat() {
        // splits it into a array based on spaces
        var zip = $("#zip").val();
        // joins the whole array with + inbetween each
        console.log(zip);

        var URL = URL1 + zip ;
        console.log(URL);

        $.ajax({
                url: URL,
                method: "GET"
        }).done(function(data) {
                console.log(data);
                var town = data.resource.pop();
                var lon = town.longitude;
                var lat = town.latitude;

                console.log(lon);
                console.log(lat);

                var URL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly&appid=cd3427ba4e02f2e106a0d18dd806a810';
                console.log(URL2);
                $.ajax({
                        url: URL2,
                        method: "GET"
                }).done(function(data2) {
                        console.log(data2);
                        var i;
                        for (i = 1; i < 8; i++) {
                                var day = data2.daily.pop();
                                console.log(day);
                                var high = day.temp.max;
                                high = high - 273.15;
                                high = high * 9 / 5;
                                high = high + 32;
                                high = Math.floor(high * 10) / 10;
                                var low = day.temp.min;
                                low  = low - 273.15;
                                low = low * 9 / 5;
                                low = low + 32;
                                low = Math.floor(low * 10) / 10;
                                var weather = day.weather.pop();
                                var icon = weather.icon;
                                var desc = weather.description;

                                console.log(desc);

                                var div = document.createElement("div");
                                div.setAttribute("class", "container");
                                div.setAttribute("id", "day"+i);
                                div.setAttribute("style", "border:3px solid black");
                                document.getElementById("forecast").appendChild(div);
                                var label = document.createElement("h2");
                                label.setAttribute("class", "center-text");
                                label.innerHTML = "Day " + i;
                                document.getElementById("day" + i).appendChild(label);
                                var img = document.createElement("img");
                                var url = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
                                img.setAttribute("src" , url);
                                document.getElementById("day" + i).appendChild(img);
                                var description = document.createElement("h3");
                                description.setAttribute("class", "center-text");
                                description.innerHTML = desc;
                                document.getElementById("day" + i).appendChild(description);
                                var temp = document.createElement("p");
                                temp.setAttribute("class", "right-text");
                                temp.innerHTML = 'Temperature high: ' + high + ' Temperature low: ' + low;
                                document.getElementById("day" + i).appendChild(temp);

                        }



                }).fail(function(error) {
                        console.log(error);


                });


        }).fail(function(err) {
                var listItem = document.createElement("h1");
                listItem.innerHTML = 'Cant find mathcing Zip Code';
                document.getElementById("forescast").appendChild(listItem);
                console.log(err);
        });
}


