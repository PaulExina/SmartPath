var map;
var panel;
var initialize;
var calculate;
var direction;

var stock_car;
var stock_bike;
var stock_walk;
var stock_train;

var first_walk_part;
var last_walk_part;    


var first_prop;
var second_prop;
var third_prop;
var fourth_prop;
var fifth_prop;

var trafficLayer;
var weatherLayer;
var cloudLayer;
var bikeLayer;
var transitLayer;

/*Map related functions*/

initialize = function(){
  var latLng = new google.maps.LatLng(48.8464111,2.3548468);
  var myOptions = {
    zoom      : 12,
    center    : latLng,
    mapTypeId : google.maps.MapTypeId.TERRAIN, // Type de carte, différentes valeurs possible HYBRID, ROADMAP, SATELLITE, TERRAIN
    maxZoom   : 20
  };

  map      = new google.maps.Map(document.getElementById('map'), myOptions);
  panel    = document.getElementById('panel');

  var marker = new google.maps.Marker({
    position : latLng,
    map      : map,
  });

     direction = new google.maps.DirectionsRenderer({
    map   : map,
    panel : panel
});

     trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    
}

function reinit(){
    
        initialize();
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_first").style.display="none";
              
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_sec").style.display="none";
        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_third").style.display="none";
        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fourth").style.display="none"; 
}

function draw_map(content){ 
      
    trafficLayer.setMap(null);
    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    var road_coordinates = [];
    
    for(var i = 0; i< content.routes[0].overview_path.length;i++){

        road_coordinates.push(new google.maps.LatLng(content.routes[0].overview_path[i].k,content.routes[0].overview_path[i].B));

    }

     var roadPath = new google.maps.Polyline({
        path: road_coordinates,
        geodesic: true,
        strokeColor: '#2C508B',
        strokeOpacity: 1.0,
        strokeWeight: 5
      });

     roadPath.setMap(map);  

    var start_loc = new google.maps.LatLng(content.routes[0].legs[0].start_location.k,content.routes[0].legs[0].start_location.B);

    marker_begin = new google.maps.Marker({
        map:map,
        draggable:true,
        icon: "css/Images/flag.png",
        animation: google.maps.Animation.DROP,
        position: start_loc
      });

    var end_loc = new google.maps.LatLng(content.routes[0].legs[0].end_location.k,content.routes[0].legs[0].end_location.B);

    marker_end = new google.maps.Marker({
        map:map,
        draggable:true,
        icon : "css/Images/flag2.png",
        animation: google.maps.Animation.DROP,
        position: end_loc
      });
    
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start_loc);
    bounds.extend(end_loc);
    map.fitBounds(bounds);
   
}

function draw_map_for_car(){
    
     trafficLayer.setMap(null);
    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    var road_coordinates = [];
    
    var steps = stock_car.result[0].etapes[0].etape;
    
    for(var i = 0; i< steps.length;i++){

        road_coordinates.push(new google.maps.LatLng(steps[i].lat,steps[i].lon));

    }

     var roadPath = new google.maps.Polyline({
        path: road_coordinates,
        geodesic: true,
        strokeColor: '#2C508B',
        strokeOpacity: 1.0,
        strokeWeight: 5
      });

     roadPath.setMap(map);  

    var start_loc = new google.maps.LatLng(steps[0].lat,steps[0].lon);

    marker_begin = new google.maps.Marker({
        map:map,
        draggable:true,
        icon: "css/Images/flag.png",
        animation: google.maps.Animation.DROP,
        position: start_loc
      });

    var end_loc = new google.maps.LatLng(steps[steps.length-1].lat,steps[steps.length-1].lon);

    marker_end = new google.maps.Marker({
        map:map,
        draggable:true,
        icon : "css/Images/flag2.png",
        animation: google.maps.Animation.DROP,
        position: end_loc
      });
    
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start_loc);
    bounds.extend(end_loc);
    map.fitBounds(bounds);
   
    
    
}

function draw_for_train(){
    
    var road_coordinates = [];
    
    
    for(var j=0; j<stock_train.length;j++){
        if(stock_train[j][0] === "WALK"){
            var walk_itin = stock_train[j][1];
            for(var i = 0; i< walk_itin.routes[0].overview_path.length;i++){
                road_coordinates.push(new google.maps.LatLng(walk_itin.routes[0].overview_path[i].k,walk_itin.routes[0].overview_path[i].B));
            }  
          
        }
        else{
            var train_itin = stock_train[j][1];
            for(var i = 0; i<train_itin.step_coords.coordinates.length;i++){
                road_coordinates.push(new google.maps.LatLng(train_itin.step_coords.coordinates[i][1],train_itin.step_coords.coordinates[i][0]));
            }
            
        }
    }
    
    
   
    
     trafficLayer.setMap(null);
    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    

     var roadPath = new google.maps.Polyline({
        path: road_coordinates,
        geodesic: true,
        strokeColor: '#2C508B',
        strokeOpacity: 1.0,
        strokeWeight: 5
      });

     roadPath.setMap(map);  

    var start_loc = new google.maps.LatLng(stock_train[0][1].routes[0].legs[0].start_location.k,stock_train[0][1].routes[0].legs[0].start_location.B);

    marker_begin = new google.maps.Marker({
        map:map,
        draggable:true,
        icon: "css/Images/flag.png",
        animation: google.maps.Animation.DROP,
        position: start_loc
      });

    var end_loc = new google.maps.LatLng(stock_train[stock_train.length-1][1].routes[0].legs[0].end_location.k,stock_train[stock_train.length-1][1].routes[0].legs[0].end_location.B);

    marker_end = new google.maps.Marker({
        map:map,
        draggable:true,
        icon : "css/Images/flag2.png",
        animation: google.maps.Animation.DROP,
        position: end_loc
      });
    
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start_loc);
    bounds.extend(end_loc);
    map.fitBounds(bounds);
}

function auto_origin() {


  var input = /** @type {HTMLInputElement} */( document.getElementById('origin'));

    var options = { 
      componentRestrictions: {country: 'fr'}
    };
    
  var autocomplete = new google.maps.places.Autocomplete(input,options); 
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();


  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

  });
}

google.maps.event.addDomListener(window, 'load', auto_origin);

function auto_destination() {

    var input = /** @type {HTMLInputElement} */( document.getElementById('destination'));
    
    var options = { 
      componentRestrictions: {country: 'fr'}
    };

    var autocomplete = new google.maps.places.Autocomplete(input,options); 
    autocomplete.bindTo('bounds', map);
        
    var infowindow = new google.maps.InfoWindow();

        
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }

  });
}

google.maps.event.addDomListener(window, 'load', auto_destination);

/*Calculate the itinerary*/

calculate = function(){
    

    var response_car;
    var response_bike;
    var response_walk;
    var response_train;
    
    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé

   if(origin && destination){
       
      
       
       var adress_origin="address="+encodeURIComponent(origin.replace(/ /gm ,"+"));
       var adress_destination= "address="+encodeURIComponent(destination.replace(/ /gm ,"+"));
    
        var success_dep = function(data){
    
            
            
            var deplon = data.result.longitude;
            var deplat = data.result.latitude;
            
            
            var success_arr = function(data){
                
                
                var arrlon = data.result.longitude;
                var arrlat = data.result.latitude;
                
                
                var values_coord = "deplon="+deplon+"&deplat="+deplat+"&arlon="+arrlon+"&arlat="+arrlat+"&crit=1&mode=coord";
            
                var success_fast = function(data){
                    
                    post_in_DB("DRIVING_FAST",data);
                    
                    values_coord = "deplon="+deplon+"&deplat="+deplat+"&arlon="+arrlon+"&arlat="+arrlat+"&crit=2&mode=coord";
                    var success_short = function(data){
                        
                        
                        post_in_DB("DRIVING_SHORT",data);    
                        values_coord = "deplon="+deplon+"&deplat="+deplat+"&arlon="+arrlon+"&arlat="+arrlat+"&crit=4&mode=coord";
                        
                        var success_eco = function(data){
                            
                            
                            post_in_DB("DRIVING_ECO",data);
                            
                            var coords = values_coord.split("&");
                    
                            var dlon = parseFloat(coords[0].split("=")[1]);
                            var dlat = parseFloat(coords[1].split("=")[1]);
                            var alon = parseFloat(coords[2].split("=")[1]);
                            var alat = parseFloat(coords[3].split("=")[1]);
                    
                            
                            var request = {
                                origin      : origin,
                                destination : destination,
                                durationInTraffic: true,
                                travelMode : google.maps.DirectionsTravelMode.WALKING
                            }
                            var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire

                            directionsService.route(request, function(response_walk, status){ // Envoie de la requête pour calculer le parcours           
                                stock_walk = response_walk;
                                post_in_DB("WALKING",response_walk);
                            });

                            request.travelMode= google.maps.DirectionsTravelMode.BICYCLING;
                            directionsService.route(request, function(response_bike, status){ // Envoie de la requête pour calculer le parcours
                                stock_bike = response_bike;  
                                post_in_DB("BICYCLING",response_bike);
                            });
                            
                            stock_train = calcTrain(dlat,dlon,alat,alon);                    
                            
                            document.getElementById('criter').style.display="block";
                        }
                          
                        var error = function(err){
                        alert("Error test Michelin final"  + JSON.stringify(err));
                        }

                        $.ajax({
                            url : "./ViaMichelinServlet",
                            type: "get",
                            data: values_coord,      
                            dataType: "json", 
                            success: success_eco,
                            error: error
                        });                 
                    }
                    
                    var error = function(err){
                    alert("Error test Michelin final"  + JSON.stringify(err));
                    }
                    $.ajax({
                        url : "./ViaMichelinServlet",
                        type: "get",
                        data: values_coord,      
                        dataType: "json", 
                        success: success_short,
                        error: error
                    });                 
                } 

                var error = function(err){
                    alert("Error test Michelin final"  + JSON.stringify(err));
                }
                $.ajax({
                    url : "./ViaMichelinServlet",
                    type: "get",
                    data: values_coord,      
                    dataType: "json", 
                    success: success_fast,
                    error: error
                });
            }            
            var error = function(err){
                alert("Error test Michelin arr"  + JSON.stringify(err));
            }
            $.ajax({
                url : "./CoordServlet",
                type: "get",
                data: adress_destination,      
                dataType: "json", 
                success: success_arr,
                error: error
            });
        } 

        var error = function(err){
            alert("Error test Michelin dep"  + JSON.stringify(err));
        }
        $.ajax({
            url : "./CoordServlet",
            type: "get",
            data: adress_origin,      
            dataType: "json", 
            success: success_dep,
            error: error
        });
    
   }
     //Remets les autres à zero
    initialize();
    document.getElementById("comparator").style.display="none";           
    document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
    document.getElementById("listed_instructions_sec").style.display="none";
    document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
    document.getElementById("listed_instructions_third").style.display="none";
    document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
    document.getElementById("listed_instructions_first").style.display="none";
        
};

function calcTrain(deplat,deplon,arrlat,arrlon){
    
     var ladate = new Date();
     var hour = ladate.getHours();
     var minutes = ladate.getMinutes()+2;
     var year = ladate.getFullYear();
     var month = ladate.getMonth()+1;
     var day = ladate.getDate();

     var time =year+"";

      if(month < 10){
         time = time +"0"+month
     }
     else{
         time = time +""+month;
     }

      if(day < 10){
         time = time +"0"+day;
     }
     else{
         time = time +""+day;
     }

     time = time +"T";

     if(hour < 10){
         time = time +"0"+hour;
     }
     else{
         time = time +""+hour;
     }

      if(minutes < 10){
         time = time +"0"+minutes;
     }
     else{
         time = time +""+minutes;
     }

     time = time + "00";

     var ori = deplon+";"+deplat;
     var dest = arrlon+";"+arrlat;

     var values = "origin="+encodeURIComponent(ori)+"&destination="+encodeURIComponent(dest)+"&datetime="+encodeURIComponent(time);

     var begin = "";
     var end = "";

     var itin_train=[];   


     var success = function(data){

         var premiere_gare = data.journeys[0].sections[0].to.stop_point;  
         var derniere_gare = data.journeys[0].sections[data.journeys[0].sections.length-1].from.stop_point;

         var coord_origin = ori.split(";");
         
         var  begin_walk_origin =  new google.maps.LatLng(coord_origin[1],coord_origin[0]);
         var coord_dest = dest.split(";");
         var  end_walk_destination =  new google.maps.LatLng(coord_dest[1],coord_dest[0]);  

         var end_walk_origin = new google.maps.LatLng(premiere_gare.coord.lat,premiere_gare.coord.lon);
         var begin_walk_destination = new google.maps.LatLng(derniere_gare.coord.lat,derniere_gare.coord.lon);

         var ind =1;
         for(var i = 0; i<data.journeys[0].sections.length;i++){

                if(data.journeys[0].sections[i].type === "public_transport"){  
                   
    
                    var step_train ={
                        step_coords : data.journeys[0].sections[i].geojson,
                        duration : data.journeys[0].sections[i].duration,
                        network : data.journeys[0].sections[i].display_informations.network,
                        distance : data.journeys[0].sections[i].geojson.properties[0].length,
                        station_start : data.journeys[0].sections[i].from.stop_point.name,    
                        station_end : data.journeys[0].sections[i].to.stop_point.name,
                        line : data.journeys[0].sections[i].display_informations.label.toString(),
                        color : data.journeys[0].sections[i].display_informations.color,
                        headway : data.journeys[0].sections[i].display_informations.direction.toString(),
                        shuttle : data.journeys[0].sections[i].display_informations.physical_mode.toString().toLowerCase()    
                    }

                    var elem = ["TRAIN",step_train];

                    itin_train.splice(ind,0,elem);
                    ind= ind+1;

                    
                }

            }
         
          var request = {
                origin      : begin_walk_origin,
                destination : end_walk_origin,
                travelMode : google.maps.DirectionsTravelMode.WALKING
        }

         var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire

         directionsService.route(request, function(response_walk, status){ // Envoie de la requête pour calculer le parcours           
                first_walk_part = response_walk;    
            
            });  

         request = {
                origin      : begin_walk_destination,
                destination : end_walk_destination,
                travelMode : google.maps.DirectionsTravelMode.WALKING
        }

         directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire

         directionsService.route(request, function(response_walk, status){ // Envoie de la requête pour calculer le parcours           
                last_walk_part =response_walk;
             
                var elem1 = ["WALK",first_walk_part];

                itin_train.splice(0,0,elem1);
 
         
         
                var elem2 = ["WALK",last_walk_part];

                itin_train.push(elem2);
                
                stock_train = itin_train;
             
                post_in_DB("TRANSIT",itin_train);
            });   

         

     }

     var error = function(err){
         stock_train = undefined;
         post_in_DB("TRANSIT",itin_train);
     }


     $.ajax({
         url : "./NavitiaServlet",
         type: "get",
         data: values,      
         dataType: "json", 
         success: success,
         error: error
     })

}

function ask2server(){

    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé

    var values = "origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination);
    
    request_bike(values);   
}

function request_bike(val){

    
    
    var val_bike = val + "&mode=BICYCLING";
    var success = function(data){
        
        
         if(data.rows !== 0){

            stock_bike =JSON.parse(data.results[0].content);
            request_walk(val); 
        }
        else{
            calculate();            
        }
         
    }

    var error = function(err){
        alert("Error request bike =>  "+ JSON.stringify(err));
    }

    $.ajax({
        url : "./GoogleDirectionServ",
        type: "get",
        data: val_bike,                  
        dataType: "json",                   
        success: success,
        error: error    
    });
}

function request_walk(val){

    var val_walk = val + "&mode=WALKING";


    var success = function(data){
         
        stock_walk =JSON.parse(data.results[0].content); 
        request_train(val);  
    }

    var error = function(err){
        alert("Error Request walk =>  "+ JSON.stringify(err));
    }

    $.ajax({
        url : "./GoogleDirectionServ",
        type: "get",
        data: val_walk,                  
        dataType: "json",                   
        success: success,
        error: error    
    });
}

function request_train(val){

    var val_train = val + "&mode=TRANSIT";
    
      var success = function(data){
          
       
        if(data.results[0].content === "Aucun itinéraire disponible"){
            stock_train = undefined;
        }
        else{
            stock_train =JSON.parse(data.results[0].content); 
        }
            
        reinit();
        document.getElementById("criter").style.display="block";   
        document.getElementById("comparator").style.display="none";           
        
    }

    var error = function(err){
        alert("Error Request walk =>  "+ JSON.stringify(err));
    }

    $.ajax({
        url : "./GoogleDirectionServ",
        type: "get",
        data: val_train,                  
        dataType: "json",                   
        success: success,
        error: error    
    });
    
 

}

function post_in_DB(mode, content){

    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé

    
    
    var content_string = addslashes(JSON.stringify(content));

    
    var value = {
        origin : origin,
        destination : destination,
        mode : mode,
        content : content !== undefined ? content_string : "Aucun itinéraire disponible"
    }

    var success = function(data){
        
    }

    var error = function(err){
        alert("Error Post in DB "  + JSON.stringify(err));
    }

              
    $.ajax({
        url : "./GoogleDirectionServ",
        type: "post",
        data: value,      
        dataType: "json", 
        success: success,
        error: error
    });
              
}

/*Shows the sorting results*/

function show_first(){
    
    initialize();

    if( document.getElementById("img-first").alt === "CAR"){
        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }
    else if(document.getElementById("img-first").alt === "WALK"){
        weatherLayer = new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        weatherLayer.setMap(map);

        cloudLayer = new google.maps.weather.CloudLayer();
        cloudLayer.setMap(map);
    }
    else if(document.getElementById("img-first").alt === "BIKE"){
        bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    }
    
    else{
        transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    }
    
   
    if(document.getElementById('listed_instructions_first').style.display=="none"){
        
        var content = "<li class='list-group-item'><h4><img src='css/Images/flag.png'/>   "+origin+" </h4></li>";
        
        
        
        if( document.getElementById("img-first").alt === "CAR"){
            content = content+ show_car();
        }
        else if(document.getElementById("img-first").alt === "BIKE"){
            content = content+ show_bike();
        }
        else if(document.getElementById("img-first").alt === "WALK"){
            content = content+ show_walk();
        }
        else if(document.getElementById("img-first").alt === "TRAIN"){
            content = content+ show_train();
        }
        
        content =content+ "<li class='list-group-item'> <h4><img src='css/Images/flag2.png'/>"+destination+"</h4></li>";
        
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_213_up_arrow.png";
        document.getElementById('instructions_first').innerHTML=content;
        document.getElementById("listed_instructions_first").style.display="block";



        //Remets les autres à zero
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_sec").style.display="none";
        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_third").style.display="none";
        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fourth").style.display="none";
        document.getElementById('arrow-fifth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fifth").style.display="none";
    }
    else{
        initialize();
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_first").style.display="none";
    }
}

function show_sec(){
    initialize();
    
    if( document.getElementById("img-sec").alt === "CAR"){
        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }
    else if(document.getElementById("img-sec").alt === "WALK"){
        weatherLayer = new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        weatherLayer.setMap(map);

        cloudLayer = new google.maps.weather.CloudLayer();
        cloudLayer.setMap(map);
    }
    else if(document.getElementById("img-sec").alt === "BIKE"){
        bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    }
    
    else{
        transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    }
    
       var content = "<li class='list-group-item'><h4><img src='css/Images/flag.png'/>   "+origin+" </h4></li>";
        
    if(document.getElementById('listed_instructions_sec').style.display=="none"){    
        
        if( document.getElementById("img-sec").alt === "CAR"){
            content = content+ show_car();
        }
        else if(document.getElementById("img-sec").alt === "BIKE"){
            content = content+ show_bike();
        }
        else if(document.getElementById("img-sec").alt === "WALK"){
            content = content+ show_walk();
        }
        else if(document.getElementById("img-sec").alt === "TRAIN"){
            content = content+ show_train();
        }
        
        content =content+ "<li class='list-group-item'> <h4><img src='css/Images/flag2.png'/>"+destination+"</h4></li>";
        
        
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_213_up_arrow.png";  
        document.getElementById('instructions_sec').innerHTML=content;
        document.getElementById("listed_instructions_sec").style.display="block";

        // Remets les autres à zéro
        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_third").style.display="none";
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_first").style.display="none";
        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fourth").style.display="none";
        document.getElementById('arrow-fifth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fifth").style.display="none";

    }
    else{
        initialize();
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_sec").style.display="none";
    }
}

function show_third(){
    initialize();
    
   if( document.getElementById("img-third").alt === "CAR"){
        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }
    else if(document.getElementById("img-third").alt === "WALK"){
        weatherLayer = new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        weatherLayer.setMap(map);

        cloudLayer = new google.maps.weather.CloudLayer();
        cloudLayer.setMap(map);
    }
    else if(document.getElementById("img-third").alt === "BIKE"){
        bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    }
    
    else{
        transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    }                      
                      
      
    if(document.getElementById('listed_instructions_third').style.display=="none"){
        
        var content = "<li class='list-group-item'><h4><img src='css/Images/flag.png'/>   "+origin+" </h4></li>";
        
        if( document.getElementById("img-third").alt === "CAR"){
            content = content+ show_car();
        }
        else if(document.getElementById("img-third").alt === "BIKE"){
            content = content+ show_bike();
        }
        else if(document.getElementById("img-third").alt === "WALK"){
            content = content+ show_walk();
        }
        else if(document.getElementById("img-third").alt === "TRAIN"){
            content = content+ show_train();
        }
        
        content =content+ "<li class='list-group-item'> <h4><img src='css/Images/flag2.png'/>"+destination+"</h4></li>";
        
    

        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_213_up_arrow.png";
        document.getElementById('instructions_third').innerHTML=content;
        document.getElementById("listed_instructions_third").style.display="block";

        // Remets les autres à zéro
        document.getElementById("listed_instructions_sec").style.display="none";
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_first").style.display="none";
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fourth").style.display="none";
        document.getElementById('arrow-fifth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fifth").style.display="none";
    }
    else{
        initialize();
        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_third").style.display="none";
    }
}

function show_fourth(){;
    
    initialize();                   
                       
   if( document.getElementById("img-fourth").alt === "CAR"){
        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }
    else if(document.getElementById("img-fourth").alt === "WALK"){
        weatherLayer = new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        weatherLayer.setMap(map);

        cloudLayer = new google.maps.weather.CloudLayer();
        cloudLayer.setMap(map);
    }
    else if(document.getElementById("img-fourth").alt === "BIKE"){
        bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    }
    
    else{
        transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    }                      

    if(document.getElementById('listed_instructions_fourth').style.display=="none"){
        
        var content = "<li class='list-group-item'><h4><img src='css/Images/flag.png'/>   "+origin+" </h4></li>";
        
        if( document.getElementById("img-fourth").alt === "CAR"){
            content = content+ show_car();
        }
        else if(document.getElementById("img-fourth").alt === "BIKE"){
            content = content+ show_bike();
        }
        else if(document.getElementById("img-fourth").alt === "WALK"){
            content = content+ show_walk();
        }
        else if(document.getElementById("img-fourth").alt === "TRAIN"){
            content = content+ show_train();
        }
        
        content =content+ "<li class='list-group-item'> <h4><img src='css/Images/flag2.png'/>"+destination+"</h4></li>";
        

        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_213_up_arrow.png";
        document.getElementById('instructions_fourth').innerHTML=content;
        document.getElementById("listed_instructions_fourth").style.display="block";

        // Remets les autres à zéro
        document.getElementById("listed_instructions_sec").style.display="none";
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_first").style.display="none";
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_third").style.display="none";
        document.getElementById('arrow-fifth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fifth").style.display="none";
    }
    else{
        initialize();
        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fourth").style.display="none";
    }
}

function show_fifth(){
    
    initialize();                   
                       
   if( (document.getElementById("img-fifth").alt === "CAR") || (document.getElementById("img-fifth").alt === "TAXI")){
        trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    }
    else if(document.getElementById("img-fifth").alt === "WALK"){
        weatherLayer = new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS
        });
        weatherLayer.setMap(map);

        cloudLayer = new google.maps.weather.CloudLayer();
        cloudLayer.setMap(map);
    }
    else if(document.getElementById("img-fifth").alt === "BIKE"){
        bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    }
    
    else{
        transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    }                      

    if(document.getElementById('listed_instructions_fifth').style.display=="none"){
        
        var content = "<li class='list-group-item'><h4><img src='css/Images/flag.png'/>   "+origin+" </h4></li>";
        
        if( (document.getElementById("img-fifth").alt === "CAR") || (document.getElementById("img-fifth").alt === "TAXI")){
            content = content+ show_car();
        }
        else if(document.getElementById("img-fifth").alt === "BIKE"){
            content = content+ show_bike();
        }
        else if(document.getElementById("img-fifth").alt === "WALK"){
            content = content+ show_walk();
        }
        else if(document.getElementById("img-fifth").alt === "TRAIN"){
            content = content+ show_train();
        }
        
        content =content+ "<li class='list-group-item'> <h4><img src='css/Images/flag2.png'/>"+destination+"</h4></li>";
        

        document.getElementById('arrow-fifth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_213_up_arrow.png";
        document.getElementById('instructions_fifth').innerHTML=content;
        document.getElementById("listed_instructions_fifth").style.display="block";

        // Remets les autres à zéro
        document.getElementById("listed_instructions_sec").style.display="none";
        document.getElementById('arrow-sec').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_first").style.display="none";
        document.getElementById('arrow-first').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById('arrow-third').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_third").style.display="none";
        document.getElementById('arrow-fourth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fourth").style.display="none";
        
    }
    else{
        initialize();
        document.getElementById('arrow-fifth').src="css/Images/glyphicons_free/glyphicons/png/glyphicons_212_down_arrow.png";
        document.getElementById("listed_instructions_fifth").style.display="none";
    }
}
              
function show_car(){
    
    var content ="";
    
    draw_map_for_car();
    
    var steps = stock_car.result[0].etapes[0].etape;
    
    var count = 0;

    for(var i = 0; i < steps.length ; i++){
        var inst = steps[i].instruction.toString();     
        var chaine = (inst.substring(0,1).toUpperCase()+inst.substring(1)).split(":");
        
            if(inst !== ""){
                if(inst.indexOf("EUR")>-1){

                    if(chaine[1] !== undefined){

                        if(chaine[2] !== undefined){    
                            content = content + "<li class='list-group-item'><img src='css/Images/glyphicons_free/glyphicons/png/glyphicons_078_warning_sign.png'/><b><font color=#FF0000>"+chaine[0]+ chaine[1]+chaine[2]+"</font></b>"
                        }

                        else{
                            content = content + "<li class='list-group-item'><img src='css/Images/glyphicons_free/glyphicons/png/glyphicons_078_warning_sign.png'/>"+chaine[0]+"<b><font color=#FF0000>" +chaine[1]+"</font></b>";
                        }


                }
                    else{
                        content = content + "<li class='list-group-item'><img src='css/Images/glyphicons_free/glyphicons/png/glyphicons_078_warning_sign.png'/>"+chaine[0]+"";  
                    }    

            }
            else{

                if(chaine[1] !== undefined){
                    if(chaine[2] !== undefined){
                         content = content +"<li class='list-group-item'>"+chaine[0]+ "<b>"+chaine[1]+chaine[2]+"</b>";
                    }

                    else{
                        content = content +"<li class='list-group-item'>"+chaine[0]+ "<b>"+chaine[1]+"</b>";
                    }
                }
                else{
                    content = content +"<li class='list-group-item'>"+chaine[0]+ "";
                }
            }

            if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                content= content+ "<span class='label label-default pull-right'>"+timeToString(steps[i].duree)+"</span></li>";
            }
            else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                content= content+ "<span class='label label-default pull-right'>"+distanceToString(steps[i].distance)+"</span></li>"; 
            }
            else{}

            }   
        
    }
    
    
    
    return content;
    
}

function show_bike(){
    draw_map(stock_bike);    
    
    var content ="";
    for(var i=0;i<stock_bike.routes[0].legs[0].steps.length;i++){
        var chaine = stock_bike.routes[0].legs[0].steps[i].instructions.split('<div style="font-size:0.9em">');

        if(chaine[1]===undefined){

            content =content +"<li class='list-group-item'>"+chaine[0];

            if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                content+= "<span class='label label-default pull-right'>"+timeToString(stock_bike.routes[0].legs[0].steps[i].duration.value)+"</span></li>";
            }
            else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                content+= "<span class='label label-default pull-right'>"+distanceToString(stock_bike.routes[0].legs[0].steps[i].distance.value)+"</span></li>"; 
            }
            else{}
        }
        else{

            content =content +"<li class='list-group-item'>"+chaine[0];

            if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                content= content+ "<span class='label label-default pull-right'>"+timeToString(stock_bike.routes[0].legs[0].steps[i].duration.value)+"</span>";
            }
            else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                content= content +"<span class='label label-default pull-right'>"+distanceToString(stock_bike.routes[0].legs[0].steps[i].distance.value)+"</span>"; 
            }
            else{}

            content+= "<div style='font-size:0.9em'>"+chaine[1]+"</li>";

        }
    }
    
    return content;
    
    
}

function show_walk(){
   draw_map(stock_walk);    
    
    var content ="";
    
    for(var i=0;i<stock_walk.routes[0].legs[0].steps.length;i++){
        var chaine = stock_walk.routes[0].legs[0].steps[i].instructions.split('<div style="font-size:0.9em">');

        if(chaine[1]===undefined){

            content =content +"<li class='list-group-item'>"+chaine[0];

            if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                content+= "<span class='label label-default pull-right'>"+timeToString(stock_walk.routes[0].legs[0].steps[i].duration.value)+"</span></li>";
            }
            else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                content+= "<span class='label label-default pull-right'>"+distanceToString(stock_walk.routes[0].legs[0].steps[i].distance.value)+"</span></li>"; 
            }
            else{}
        }
        else{

            content =content +"<li class='list-group-item'>"+chaine[0];

            if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                content= content+ "<span class='label label-default pull-right'>"+timeToString(stock_walk.routes[0].legs[0].steps[i].duration.value)+"</span>";
            }
            else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                content= content +"<span class='label label-default pull-right'>"+distanceToString(stock_walk.routes[0].legs[0].steps[i].distance.value)+"</span>"; 
            }
            else{}

            content+= "<div style='font-size:0.9em'>"+chaine[1]+"</li>";

        }
    }    
    return content;
     
}

function show_train(){
    
    draw_for_train();
     
    var content ="";
    
    for(var i=0; i<stock_train.length;i++){
        if(stock_train[i][0] === "WALK"){
            var walk_itin = stock_train[i][1];
            for(var j=0;j<walk_itin.routes[0].legs[0].steps.length;j++){
                var chaine = walk_itin.routes[0].legs[0].steps[j].instructions.split('<div style="font-size:0.9em">');

                if(chaine[1]===undefined){

                    content =content +"<li class='list-group-item'>"+chaine[0];

                    if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                        content+= "<span class='label label-default pull-right'>"+timeToString(walk_itin.routes[0].legs[0].steps[j].duration.value)+"</span></li>";
                    }
                    else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                        content+= "<span class='label label-default pull-right'>"+distanceToString(walk_itin.routes[0].legs[0].steps[j].distance.value)+"</span></li>"; 
                    }
                    else{}
                }
                else{

                    content =content +"<li class='list-group-item'>"+chaine[0];

                    if(document.getElementById('comparator').getAttribute("name") === "TIME"){

                        content= content+ "<span class='label label-default pull-right'>"+timeToString(walk_itin.routes[0].legs[0].steps[j].duration.value)+"</span>";
                    }
                    else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                        content= content +"<span class='label label-default pull-right'>"+distanceToString(walk_itin.routes[0].legs[0].steps[j].distance.value)+"</span>"; 
                    }
                    else{}

                    content+= "<div style='font-size:0.9em'>"+chaine[1]+"</li>";

                }
            }  
        }
        else {
            
            var train_itin = stock_train[i][1];    
            if(document.getElementById('comparator').getAttribute("name") === "TIME"){
                content = content+"<li class='list-group-item'><span class='label label-default pull-right'>"+timeToString(train_itin.duration)+"</span> À <b>"+train_itin.station_start+"</b> , prendre le "+train_itin.shuttle+" <span class='badge' id='badge' style='background-color:#"+train_itin.color+"'>"+train_itin.line+"</span>";
            }
            else if(document.getElementById('comparator').getAttribute("name") === "DISTANCE"){
                content = content+"<li class='list-group-item'><span class='label label-default pull-right'>"+distanceToString(train_itin.distance)+"</span> À <b>"+train_itin.station_start+"</b> , prendre le "+train_itin.shuttle+" <span class='badge' id='badge' style='background-color:#"+train_itin.color+"'>"+train_itin.line+"</span>";
            }
            else{
                content = content+"<li class='list-group-item'> À <b>"+train_itin.station_start+"</b> , prendre le "+train_itin.shuttle+" <span class='badge' id='badge' style='background-color:#"+train_itin.color+"'>"+train_itin.line+"</span>";
            }
            
            content = content+" vers <b>"+train_itin.headway+"</b>";
            content = content+" et descendre à <b>"+train_itin.station_end+"</b></li>";
           
            
        }
       
    }
    
    return content;
    
}

/*Useful functions*/            

function distance_train(){
 
    var length_train =0;
    
    for(var i=0; i<stock_train.length;i++){
        
          if(stock_train[i][0] === "WALK"){
            var walk_itin = stock_train[i][1];
            length_train = length_train + walk_itin.routes[0].legs[0].distance.value;
          }
     
            else{
                var train_itin = stock_train[i][1];
                length_train = length_train + train_itin.distance;
            }
    }
    
    return length_train;
}

function time_train(){
    
    
    var time_train=0;
    
    for(var i=0; i<stock_train.length;i++){
        
          if(stock_train[i][0] === "WALK"){
            var walk_itin = stock_train[i][1];
            time_train = time_train + walk_itin.routes[0].legs[0].duration.value;
          }
     
            else{
                var train_itin = stock_train[i][1];
                time_train = time_train+ train_itin.duration;
            }
    }
    
    return time_train;
}

function addslashes(str) {
  //  discuss at: http://phpjs.org/functions/addslashes/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Ates Goral (http://magnetiq.com)
  // improved by: marrtins
  // improved by: Nate
  // improved by: Onno Marsman
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Oskar Larsson Högfeldt (http://oskar-lh.name/)
  //    input by: Denny Wardhana
  //   example 1: addslashes("kevin's birthday");
  //   returns 1: "kevin\\'s birthday"

  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0');
}

function exchange(){
              
    var tmp = document.getElementById('origin').value;

    document.getElementById('origin').value = document.getElementById('destination').value;
              
    document.getElementById('destination').value = tmp;
              }
              
function distanceToString(distance){
    
    var km = Math.floor(distance/1000);
    
    var m = distance - km*1000;
    
    var dist = "";
  
    if(km !== 0){
        dist = dist+ km +" kilomètre(s) ";
    }
    
    if(m !== 0){
            
        dist = dist + m +" mètre(s)";
                
            }
    
    
    return dist;
    
}

function timeToString(time){
    
    var heure = Math.floor(time/3600);
            
    var minutes = Math.floor((time- (Math.floor(time/3600)*3600))/60);

    var secondes = (time-(heure*3600)-(minutes*60));

    var duree="";

    if(heure !== 0){
        duree = duree + heure +" heure(s) ";
    }

    if(minutes!== 0){
        duree = duree + minutes +" minute(s) ";
    }

    if(secondes!== 0){
        duree = duree +secondes +" seconde(s)";
    }
        
    return duree;
            
}

function costToString(cost){
    
    var prix = Math.round(100*cost)/100;
    
    if(cost > 0.005){
        return prix +" €";
    }
     
    return "Gratuit";
}

function auDixieme(nombre){
  return Math.round(10*nombre)/10;
}
    
function arr(nb){
  
    var p10=Math.floor((nb+5)/10)*10;
    return p10;
    
    }
/*Comparing functions */              

function compare_by_time(){

    
    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé

    var values = "origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&mode=DRIVING_FAST";
    
    var success = function(data){
        
      
        stock_car = JSON.parse(data.results[0].content);
       
        reinit();
 
        document.getElementById('comparator').setAttribute("name","TIME");
        document.getElementById('row_fifth').style.display="none";
        var by = "time";

        var car_str= stock_car.result[0].tempsTotal;
        var bike_str = stock_bike.routes[0].legs[0].duration.value;
        var walk_str = stock_walk.routes[0].legs[0].duration.value;

        var train_str;
        if(stock_train !== undefined){
            train_str = time_train();
        }
        else{
            train_str = 1000000000;
        }

        var values = "car="+car_str+"&bike="+bike_str+"&walk="+walk_str+"&train="+train_str+"&by="+by;

        var success = function(data){

           switch(data.result[0].type) {
                case "CAR":
                    first_prop = stock_car;
                    break;
                case "BIKE":
                    first_prop = stock_bike;
                    break;
                case "WALK":
                    first_prop = stock_walk;
                    break;
                case "TRAIN":
                   first_prop = stock_train;
                   break;
            }


            if(first_prop !== undefined){
                document.getElementById('first').placeholder =  timeToString(data.result[0].time);
            }
            else{
                document.getElementById('first').placeholder= "Aucun itinéraire disponible";
            }
            
            
            document.getElementById("img-first").alt = data.result[0].type;
            document.getElementById("img-first").src= data.result[0].image;   
          
            

            switch(data.result[1].type) {
                case "CAR":
                    second_prop = stock_car;
                    break;
                case "BIKE":
                    second_prop = stock_bike;
                    break;
                case "WALK":
                    second_prop = stock_walk;
                    break;
                case "TRAIN":
                   second_prop = stock_train;
                   break;
            }

            if(second_prop !== undefined){
                document.getElementById('sec').placeholder =  timeToString(data.result[1].time);
            }
            else{
                document.getElementById('sec').placeholder= "Aucun itinéraire disponible";
            }
            
            
            document.getElementById("img-sec").alt = data.result[1].type;
            document.getElementById("img-sec").src= data.result[1].image;   
            

            switch(data.result[2].type) {
                case "CAR":
                    third_prop = stock_car;
                    break;
                case "BIKE":
                    third_prop = stock_bike;
                    break;
                case "WALK":
                    third_prop = stock_walk;
                    break;
                case "TRAIN":
                   third_prop = stock_train;
                   break;
            }

            if(third_prop !== undefined){
                document.getElementById('third').placeholder =  timeToString(data.result[2].time);
            }
            else{
                document.getElementById('third').placeholder= "Aucun itinéraire disponible";
            }
            document.getElementById("img-third").alt = data.result[2].type;
            document.getElementById("img-third").src= data.result[2].image;
            

             switch(data.result[3].type) {
                case "CAR":
                    fourth_prop = stock_car;
                    break;
                case "BIKE":
                    fourth_prop = stock_bike;
                    break;
                case "WALK":
                    fourth_prop = stock_walk;
                    break;
                case "TRAIN":
                   fourth_prop = stock_train;
                   break;
            }

            document.getElementById("img-fourth").alt = data.result[3].type;
            document.getElementById("img-fourth").src= data.result[3].image; 
            if(fourth_prop !== undefined){

                document.getElementById('fourth').placeholder =  timeToString(data.result[3].time);
            }
            else{
                document.getElementById('fourth').placeholder= "Aucun itinéraire disponible";
            }


        }

        var error = function(err){
            alert("Error Compare by time"  + JSON.stringify(err));
        }


        $.ajax({
            url : "./CompareServlet",
            type: "get",
            data: values,      
            dataType: "json", 
            success: success,
            error: error
        });

        document.getElementById("comparator").style.display="block";


    }

    var error = function(err){
        alert("Error request fast in car =>  "+ JSON.stringify(err));
    }

    $.ajax({
        url : "./GoogleDirectionServ",
        type: "get",
        data: values,                  
        dataType: "json",                   
        success: success,
        error: error    
    }); 
   
}

function compare_by_distance(){
    
     
    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé

    var values = "origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&mode=DRIVING_SHORT";
    
    var success = function(data){
        
        stock_car = JSON.parse(data.results[0].content);
        
        reinit();

        document.getElementById('comparator').setAttribute("name","DISTANCE");
        document.getElementById('row_fifth').style.display="none";
        var by = "distance";

        var car_str= stock_car.result[0].distTotale;
        var bike_str = stock_bike.routes[0].legs[0].distance.value;
        var walk_str = stock_walk.routes[0].legs[0].distance.value;

        var train_str;
        if(stock_train !== undefined){
            train_str = distance_train();
        }
        else{
            train_str = 1000000000;
        }

        var values = "car="+car_str+"&bike="+bike_str+"&walk="+walk_str+"&train="+train_str+"&by="+by;

        var success = function(data){

           switch(data.result[0].type) {
                case "CAR":
                    first_prop = stock_car;
                    break;
                case "BIKE":
                    first_prop = stock_bike;
                    break;
                case "WALK":
                    first_prop = stock_walk;
                    break;
                case "TRAIN":
                   first_prop = stock_train;
                   break;
            }

            if(first_prop !== undefined){

                document.getElementById('first').placeholder =  distanceToString(data.result[0].distance);
            }
            else{
                document.getElementById('first').placeholder= "Aucun itinéraire disponible";
            }

            document.getElementById("img-first").alt = data.result[0].type;
            document.getElementById("img-first").src= data.result[0].image;   
            
            switch(data.result[1].type) {
                case "CAR":
                    second_prop = stock_car;
                    break;
                case "BIKE":
                    second_prop = stock_bike;
                    break;
                case "WALK":
                    second_prop = stock_walk;
                    break;
                case "TRAIN":
                   second_prop = stock_train;
                   break;
            }

            if(second_prop !== undefined){

                document.getElementById('sec').placeholder =  distanceToString(data.result[1].distance);
            }
            else{
                document.getElementById('sec').placeholder= "Aucun itinéraire disponible";
            }

            
            document.getElementById("img-sec").alt = data.result[1].type;
            document.getElementById("img-sec").src= data.result[1].image;   
        

            switch(data.result[2].type) {
                case "CAR":
                    third_prop = stock_car;
                    break;
                case "BIKE":
                    third_prop = stock_bike;
                    break;
                case "WALK":
                    third_prop = stock_walk;
                    break;
                case "TRAIN":
                   third_prop = stock_train;
                   break;
            }

            document.getElementById("img-third").alt = data.result[2].type;
            document.getElementById("img-third").src= data.result[2].image;
            if(third_prop !== undefined){

                document.getElementById('third').placeholder =  distanceToString(data.result[2].distance);
            }
            else{
                document.getElementById('third').placeholder= "Aucun itinéraire disponible";
            }

             switch(data.result[3].type) {
                case "CAR":
                    fourth_prop = stock_car;
                    break;
                case "BIKE":
                    fourth_prop = stock_bike;
                    break;
                case "WALK":
                    fourth_prop = stock_walk;
                    break;
                case "TRAIN":
                   fourth_prop = stock_train;
                   break;
            }

            document.getElementById("img-fourth").alt = data.result[3].type;
            document.getElementById("img-fourth").src= data.result[3].image; 
            if(fourth_prop !== undefined){

                document.getElementById('fourth').placeholder = distanceToString(data.result[3].distance);
            }
            else{
                document.getElementById('fourth').placeholder= "Aucun itinéraire disponible";
            }


        }

        var error = function(err){
            alert("Error Compare by distance "  + JSON.stringify(err));
        }


        $.ajax({
            url : "./CompareServlet",
            type: "get",
            data: values,      
            dataType: "json", 
            success: success,
            error: error
        });


        document.getElementById("comparator").style.display="block";

    }
      
    var error = function(err){
        alert("Error request short in car =>  "+ JSON.stringify(err));
    }

    $.ajax({
        url : "./GoogleDirectionServ",
        type: "get",
        data: values,                  
        dataType: "json",                   
        success: success,
        error: error    
    }); 
} 

function compare_by_cost(){
    
    origin      = document.getElementById('origin').value; // Le point départ
    destination = document.getElementById('destination').value; // Le point d'arrivé

    var values = "origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&mode=DRIVING_ECO";

    
    
    var success = function(data){
        
        stock_car = JSON.parse(data.results[0].content);
        reinit();

        document.getElementById('comparator').setAttribute("name","COST");
       
        var by = "cost";

        var car = JSON.stringify(stock_car);
        var train = JSON.stringify(stock_train);
        var values ="json_car="+car+"&by="+by;
        
        
        if(stock_train!==undefined){
            values = values+"&json_train="+train;
        }


        
        var success = function(data){

           switch(data.result[0].type) {
                case "CAR":
                    first_prop = stock_car;
                    break;
                case "BIKE":
                    first_prop = stock_bike;
                    break;
                case "WALK":
                    first_prop = stock_walk;
                    break;
                case "TRAIN":
                   first_prop = stock_train;
                   break;
                case "TAXI":
                   first_prop = stock_car;
                   break;
            }
            if(first_prop !== undefined){

                document.getElementById('first').placeholder =  costToString(data.result[0].cost);
            }
            else{
                document.getElementById('first').placeholder= "Aucun itinéraire disponible";
            }



            document.getElementById("img-first").alt = data.result[0].type;
            document.getElementById("img-first").src= data.result[0].image;   
            

            switch(data.result[1].type) {
                case "CAR":
                    second_prop = stock_car;
                    break;
                case "BIKE":
                    second_prop = stock_bike;
                    break;
                case "WALK":
                    second_prop = stock_walk;
                    break;
                case "TRAIN":
                   second_prop = stock_train;
                   break;
                case "TAXI":
                   second_prop = stock_car;
                   break;
            }
            
            if(second_prop !== undefined){

                document.getElementById('sec').placeholder =  costToString(data.result[1].cost);
            }
            else{
                document.getElementById('sec').placeholder= "Aucun itinéraire disponible";
            }


            document.getElementById("img-sec").alt = data.result[1].type;
            document.getElementById("img-sec").src= data.result[1].image;   
            
            switch(data.result[2].type) {
                case "CAR":
                    third_prop = stock_car;
                    break;
                case "BIKE":
                    third_prop = stock_bike;
                    break;
                case "WALK":
                    third_prop = stock_walk;
                    break;
                case "TRAIN":
                   third_prop = stock_train;
                   break;
                case "TAXI":
                   third_prop = stock_car;
                   break;
            }
            if(third_prop !== undefined){

                document.getElementById('third').placeholder =  costToString(data.result[2].cost);
            }
            else{
                document.getElementById('third').placeholder= "Aucun itinéraire disponible";
            }
    
            
            document.getElementById("img-third").alt = data.result[2].type;
            document.getElementById("img-third").src= data.result[2].image;

             switch(data.result[3].type) {
                case "CAR":
                    fourth_prop = stock_car;
                    break;
                case "BIKE":
                    fourth_prop = stock_bike;
                    break;
                case "WALK":
                    fourth_prop = stock_walk;
                    break;
                case "TRAIN":
                   fourth_prop = stock_train;
                   break;
                case "TAXI":
                   fourth_prop = stock_car;
                   break;
            }

            document.getElementById("img-fourth").alt = data.result[3].type;
            document.getElementById("img-fourth").src= data.result[3].image; 
            if(fourth_prop !== undefined){

                document.getElementById('fourth').placeholder =  costToString(data.result[3].cost);
            }
            else{
                document.getElementById('fourth').placeholder= "Aucun itinéraire disponible";
            }


             switch(data.result[4].type) {
                case "CAR":
                    fifth_prop = stock_car;
                    break;
                case "BIKE":
                    fifth_prop = stock_bike;
                    break;
                case "WALK":
                    fifth_prop = stock_walk;
                    break;
                case "TRAIN":
                   fifth_prop = stock_train;
                   break;
                case "TAXI":
                   fifth_prop = stock_car;
                   break;
            }

            document.getElementById("img-fifth").alt = data.result[4].type;
            document.getElementById("img-fifth").src= data.result[4].image; 
            if(fifth_prop !== undefined){

                document.getElementById('fifth').placeholder =  costToString(data.result[4].cost);
            }
            else{
                document.getElementById('fifth').placeholder= "Aucun itinéraire disponible";
            }

             document.getElementById('row_fifth').style.display="block";
        }

        var error = function(err){
            alert("Error Compare by cost "  + JSON.stringify(err));
        }


        $.ajax({
            url : "./CompareServlet",
            type: "get",
            data: values,      
            dataType: "json", 
            success: success,
            error: error
        });

         document.getElementById("comparator").style.display="block";
    }
    
     var error = function(err){
        alert("Error request eco in car =>  "+ JSON.stringify(err));
    }

    $.ajax({
        url : "./GoogleDirectionServ",
        type: "get",
        data: values,                  
        dataType: "json",                   
        success: success,
        error: error    
    }); 
    
    
}
              
function compareNombres(a, b) {
  return a - b;
}

function testCoord(){
     
     origin      = document.getElementById('origin').value; // Le point départ
     //destination = document.getElementById('destination').value; // Le point d'arrivé
        
     var ori = origin.replace(/ /gm ,"+");
    
     var values = "address="+encodeURIComponent(ori);
   
     var success = function(data){
            var deplon = data.results[0].geometry.location.lng;
            var deplat = data.results[0].geometry.location.lat;
            
           
     }
 
     var error = function(err){
         alert("Error test Coord"  + JSON.stringify(err));
     }
 
               
     $.ajax({
         url : "./CoordServlet",
         type: "get",
         data: values,      
         dataType: "json", 
         success: success,
         error: error
     })
}


initialize();
