//to use this file please add jQuery.cookie library 
//some functions of this file needs bootstrapValidator

function setCookie(obj){
    if(obj.hasOwnProperty('email') && obj.hasOwnProperty('firstname') && obj.hasOwnProperty('lastname') && obj.hasOwnProperty("address")){
        $.cookie('email', obj.email, { expires: 1, path: '/' });
        $.cookie('firstname', obj.firstname, { expires: 1, path: '/' });
        $.cookie('lastname', obj.lastname, { expires: 1, path: '/' });
        $.cookie('address', JSON.stringify(obj.address), { expires: 1, path: '/' });
        
        $.event.trigger({
            type:"userLoggedIn",
            message:"a user just logged in",
            time : new Date()
        });
        
        return true;
    }else
        return false;
}

function clearCookies(){
    $.removeCookie('email', {path:'/'});
    $.removeCookie('firstname', {path:'/'});
    $.removeCookie('lastname', {path:'/'});
    $.removeCookie('address', {path:'/'});
    
    $.event.trigger({
        type:"userLoggedOut",
        message : "a user just logged out",
        time : new Date()
    });
}

function setCookieAddress(obj){
    if(obj.hasOwnProperty('address')){
        $.removeCookie('address', {path:'/'});
        $.cookie('address', JSON.stringify(obj.address), {expires:1, path: '/'});
                
        $.event.trigger({
            type: "userChangedAddr",
            message : "user just changed address",
            time : new Date()
        });
        
        return true;
    }else
        return false;
    
}