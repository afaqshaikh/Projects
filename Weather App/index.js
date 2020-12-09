$(document).ready(function(){
    $('.short').hide();
    if(navigator.geolocation){
        var currentPosition = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentPosition = position;
            // set long and lati
            var latitude = currentPosition.coords.latitude;
            var longitude = currentPosition.coords.longitude;
            console.log(latitude,longitude);
            var url = 'http://api.weatherstack.com/current?access_key=c0bfe851c65539a7430aebb560281642&query=';
            $.getJSON(url + latitude + ',' + longitude,function(data){
            // JSON.stringfy covert javascript object in to string
            var data = JSON.stringify(data);
            // JSON.parse covert a string of JSON into Javascript object
            var json = JSON.parse(data);
            var country = json.location.country;
            var city = json.location.name;
            var state = json.location.region;

            var temp = json.current.temp_c;
            var temp_f = json.current.temp_f;
            var last_updated = json.current.last_updated;
            
            var wind = json.current.wind_kph;
            var humidity = json.current.humidity;
            var time = json.location.localtime.split(' ')[1];
            var cloud = json.current.cloud;
            console.log(data);
            $('#weather').html(city + ',' + state + ',' + country); 
            // if(temp<18){
            //     $('.grey-jumbo').css({
            //         backgroundImage:'url(https://image.shutterstock.com/image-photo/sunshine-clouds-sky-during-morning-600w-722588842.jpg)';
            //     });
            //     $('#temp').html('<h1>It is pretty cold day today.......<hr/></h1>');
            // }else if(temp>10 && temp<28){
            //     $('.grey-jumbo').css({
            //         backgroundImage:'url(https://image.shutterstock.com/image-photo/sunshine-clouds-sky-during-morning-600w-722588842.jpg)';
            //     });
            //     $('#temp').html('<h1>It is sunny day today.......<hr/></h1>');
            // }else{
            //     $('.grey-jumbo').css({
            //         backgroundImage:'url(https://image.shutterstock.com/image-photo/sunshine-clouds-sky-during-morning-600w-722588842.jpg)';
            //     });
            //     $('#temp').html('<h1>It is hot day today.......<hr/></h1>');
            // };
            $('#info1').html(time);
            $('#info2').html('Wind ' + wind + 'kph');  
            $('#info3').html(temp + '&#8451');
            $('.short').show()
            
            var yes = true;
            $('#switch').on('click',function(){
                if(yes){
                    $('#info3').html(temp_f + '&#8457');
                    $('#switch').html('Show in Farenheight');
                    yes = false;
                }else{
                    $('#info3').html(temp + '&#8451');
                    $('#switch').html('Show in Celcius');
                    yes = true;
                }
            });
            if(cloud <= 30){
                $('#info4').html('Clear Sky');
            }else{
                $('#info4').html('Cloudy Sky');
            }
            $('#info5').html('Humidity ' + humidity + '%');
            });
        }); 
    }
});
