//You need to include session.js before this file 

//this function send a request to server when the button submit of the login form is triggered 

$(document).ready(function() {
    
    //sends the login form to server when the button submit is triggered
    $("#loginForm").unbind("submit").submit(function(event){
        event.preventDefault();
        
        var data = {
            email : $(this).find("input[name=inputEmail]").val(),
            pwd : $(this).find("input[name=inputPwd]").val()
        };
        
        var success = function(data){
            
            if(data.message === "Wrong email or password"){
                alert(data.message);
                $('#loginForm').bootstrapValidator('resetForm', true);
            }else if(data.message === "success"){
                if(!setCookie(data.result))
                    alert("Cannot save user data in cookie");
            }else
                alert("Error : "+data.error);
        }

        var error = function(data){
           alert("AJAX error : "+JSON.stringify(data));
        }

        $.ajax({
            url : "./LoginServlet",
            type: "post",
            data: data,                  
            dataType: "json",                   
            success: success,
            error: error    
        });
        
    });
    
    // sends the register form to server when the button submit is triggered
    $("#registerForm").unbind("submit").submit(function(event){
        
        event.preventDefault();
        
        var user_data = {
            email : $(this).find("input[name=inputEmail]").val(),
            pwd : $(this).find("input[name=inputPwd]").val(),
            firstname : $(this).find("input[name=inputFirstName]").val(),
            lastname : $(this).find("input[name=inputLastName]").val()
        };
        
        var success = function(data){
            if(data.message === "success"){
                if(!setCookie({email : user_data.email,
                              firstname : user_data.firstname,
                              lastname : user_data.lastname,
                              address : {}
                             })
                  )
                    alert("Cannot save user data in cookie");
            }else
                alert("Error : "+data.error+ " message : "+data.message);
        }

        var error = function(data){
            alert("AJAX error : "+JSON.stringify(data));
        }

        $.ajax({
            url : "./AddUserServlet",
            type: "post",
            data: user_data,                  
            dataType: "json",                   
            success: success,
            error: error    
        });
        
    });
    
    // sends the address form to server when the button submit is triggered
    $("#addressForm").unbind("submit").submit(function(event){
        event.preventDefault();
        
        var keys = $('input[name="keysInput\\[\\]"]').map(function(){return $(this).val();}).get(),
            newAddresses = $('input[name="addressInput\\[\\]"]').map(function(){return $(this).val();}).get();
        
        //deleting empty data
        for(var i = 0; i < keys.length; i++){
            if(keys[i] === "")
                keys.splice(i,1);
            if(newAddresses[i] === "")
                newAddresses.splice(i,1);
        }
        
        var same = false; //set to true if the old list of addresses is the same as the new
        
        var myAddresses = $.cookie('address');
        
        //checking if there is something changed, if so then we send to the server
        for(var k in keys){    
            if(keys.hasOwnProperty && !myAddresses.hasOwnProperty(k)){
                same = false;
                break;   
            }
        }
        if(same){
            for(var i = 0; i < newAddresses.length; i++){
                if(newAddresses[i] == myAddresses[keys[i]]){
                    same = false;
                    break;
                }
            }
        }
        
        
        if(!same){

            var addresses = {}; //addresses with keys will be stored here
            
            var success = function(data){
                if(data.message === "success"){
                    if(!setCookieAddress({address : addresses}))
                        alert('Cannot save user data in cookie');
                }else
                    alert("Error : "+data.error+"  message : "+data.message);
            }

            var error = function(data){
                alert("AJAX error : "+JSON.stringify(data));
            }
            
            //construct an object with the right fields
            for(var i  = 0; i < keys.length; i++){
                addresses[keys[i]] = newAddresses[i];
            }
            
            var data = {
                email : $.cookie('email'),
                address : JSON.stringify(addresses)
            }
                        
            $.ajax({
                url : "./AddAddressServlet",
                type: "post",
                data: data,                  
                dataType: "json",                   
                success: success,
                error: error    
            });   
        }
    });
    
    //verify if the password is good and then trigger the modal to change the password
    $("#askPwdForm").unbind("submit").submit(function(event){
        event.preventDefault();
        
        var data = {
            email : $.cookie('email'),
            pwd : $(this).find("input[name=askPwdInput]").val()
        };
        
        var success = function(data){
            if(data.message === "Wrong email or password"){
                alert(data.message);
                $('#askPwdForm').bootstrapValidator('resetForm', true);
            }else if(data.message === "success"){
                $('#askPwdModal').modal('hide');
                $('#askPwdForm').bootstrapValidator('resetForm', true);
                $('#changePwdModal').modal('show'); 
            }else
                alert("Error : "+data.error);
        }
        
        var error = function(data){
            alert("Error : "+JSON.stringify(data));
            alert("Please try again later");
        }
        
        $.ajax({
            url : "./LoginServlet",
            type: "post",
            data: data,                  
            dataType: "json",                   
            success: success,
            error: error    
        });
    });
    
    //send the new password
    $("#changePwdForm").unbind("submit").submit(function(event){
        event.preventDefault();
        
        var data = {
            email : $.cookie('email'),
            pwd : $(this).find("input[name=newPwdInput]").val()
        };
        
        var success = function(data){
            if(data.message === "success"){
                alert('Le nouveau mot de passe a bien été pris en compte');
                $("#changePwdModal").modal('hide');
            }else
                alert("Error : "+data.error);
        }
        
        var error = function(data){
            alert("Error : "+JSON.stringify(data));
            alert("Veuillez réessayer ultérieurement");
        }
        
        $.ajax({
            url : "./ModifyPwdServlet",
            type: "post",
            data: data,                  
            dataType: "json",                   
            success: success,
            error: error    
        });
    });
    
});