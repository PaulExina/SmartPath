//include this file right after bootstrap validator and session.js

//this function loads the address form with informations stored in cookies 
function loadAddressForm(){
    var addresses = JSON.parse($.cookie('address'));
    var list_keys = Object.keys(addresses);
    for(var i = 0 ; i < list_keys.length; i++){
        var a = addresses[list_keys[i]];
        var $template = $("#addressFormTemplate");
        var $clone = $template
                        .clone()
                        .removeClass('hide')
                        .removeAttr('id')
                        .insertBefore($template);
        
        $clone.find('[name="keysInput[]"]').val(list_keys[i]);
        $clone.find('[name="addressInput[]"]').val(a);
        
        var $keys   = $clone.find('[name="keysInput[]"]');
        var $addr = $clone.find('[name="addressInput[]"]');

        $('#addressForm').bootstrapValidator('addField', $keys);
        $('#addressForm').bootstrapValidator('addField', $addr);
    }
}

function resetAddressForm(){
    $("#addressForm").find(".removeButton:visible").click();
}

$(document).ready(function() {
    $("label").css("visibility", "hidden");
    
    $("input").focus(function(){
        $(this).parent().prev("label").css("visibility", "visible").css("color","#428bca"); 
    });
    $("input").blur(function(){
        $(this).parent().prev("label").css("visibility", "hidden");
    });
    
    $(".addButton").mouseover(function(){
        $(this).parent().prev("label").css("visibility", "visible").css("color","#428bca");
    });
    $(".addButton").mouseleave(function(){
        $(this).parent().prev("label").css("visibility", "hidden");
    });
    
    //verification of the login Form 
    $('#loginForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: [':disabled'],
        
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email is required'
                    },
                    emailAddress:{
                        message:"The input is not a valid email address"
                    }
                }
            },
            inputPwd: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    different: {
                        field: 'inputEmail',
                        message: 'The password cannot be the same as email'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            }
        }
    });
    //clear the modal when hidden
    $('#loginModal').on('shown.bs.modal', function() {
        $('#loginForm').bootstrapValidator('resetForm', true);
    });

    
    //verification of the register Form 
    $('#registerForm').bootstrapValidator({
        message: 'This value is not valid',
        excluded: [':disabled'],
        
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            inputFirstName:{
                validators : {
                    regexp:{
                        regexp: /^[a-z\s]+$/i,
                        message: "The user name can only consist of alphabeticals"
                    }
                }    
            },
            inputLastName:{
                validators : {
                    regexp:{
                        regexp: /^[a-z\s]+$/i,
                        message: "The user name can only consist of alphabeticals"
                    }
                }
            },
            inputEmail: {
                validators: {
                    notEmpty: {
                        message: 'The email is required'
                    },
                    emailAddress:{
                        message:"The input is not a valid email address"
                    },
                    remote: {
                        message : "The email is already used",
                        url : "./EmailsServlet"
                    }
                }
            },
            inputPwd: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    different: {
                        field: 'inputEmail',
                        message: 'The password cannot be the same as email'
                    },
                    different:{
                        field: 'inputFirstName',
                        message:'The password cannot be the same as the first-name'
                    },
                    different:{
                        field: 'inputLastName',
                        message: 'The password cannot be the same as the last-name'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            },
            inputConfPwd: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required'
                    },
                    identical:{
                        field : "inputPwd",
                        message : "The password and its confirm are not the same"
                    }
                }
            }
        }
    });
    
    //clear the modal when hidden
    $('#registerModal').on('shown.bs.modal', function() {
        $('#registerForm').bootstrapValidator('resetForm', true);
    });
    
    //verify and handle event of address form
    $("#addressForm")
        .bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'keysInput[]': {
                    validators: {
                        notEmpty: {
                            message: 'The place required and cannot be empty'
                        },
                        regexp:{
                            regexp: /^[a-zA-Z0-9]+$/i,
                            message: "The place can only consist of alphabeticals, no space"
                        }
                    }
                },
                'addressInput[]': {
                    validators: {
                        notEmpty: {
                            message: 'The place required and cannot be empty'
                        },
                        regexp:{
                            regexp: /^[a-zA-Z0-9 \-]+$/i,
                            message: "The adress can only consist of alphabeticals, numbers"
                        }
                    }
                }
            }
        })
        //adding fields dynamically
        .on('click', '.addButton', function(){
            var $template = $("#addressFormTemplate");
            var $clone = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .insertBefore($template);

            var $keys = $clone.find('[name="keysInput[]"]');
            var $addr = $clone.find('[name="addressInput[]"]');

            $('#addressForm').bootstrapValidator('addField', $keys);
            $('#addressForm').bootstrapValidator('addField', $addr);
        })
        //remove fields dynamically
        .on('click', '.removeButton', function(){
            var $row = $(this).parents('.form-group'),
            $keys = $row.find('[name="keysInput[]"]'),
            $addr = $row.find('[name="addressInput[]"]');

            $row.remove();
            $("#addressForm").bootstrapValidator('removeField', $keys);
            $("#addressForm").bootstrapValidator('removeField', $addr);
        });
    
    $('#addressModal').on('shown.bs.modal', function() {
        $('#addressForm').bootstrapValidator('resetForm', true);
        resetAddressForm();
        loadAddressForm();
    });
    
    //verify password form (trigger before changing the password)
    $("#askPwdForm").bootstrapValidator({
        message: 'This value is not valid',
        excluded: [':disabled'],
        fields: {
            askPwdInput: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    }
                }
            }
        }
    });
    $("askPwdModal").on('shown.bs.modal', function(){
        $('#askPwdModal').bootstrapValidator('resetForm', true);
    });
    
    //verify change password form 
    $("#changePwdForm").bootstrapValidator({
        message: 'This value is not valid',
        excluded: [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            newPwdInput: {
                validators: {
                    notEmpty: {
                        message: 'The password is required'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            },
            confNewPwdInput: {
                validators: {
                    notEmpty: {
                        message: 'The confirm password is required'
                    },
                    identical:{
                        field : "newPwdInput",
                        message : "The password and its confirm are not the same"
                    }
                }
            }
        }
    });
    $("#changePwdModal").on('hidden.bs.modal', function(){
        $('#changePwdModal').bootstrapValidator('resetForm', true);
    });
    
    //automatically changes the origin field if the value equals to the key of an address
    $("#originDestinationForm input[name='origin']").on('keyup change',function(){
        if($.cookie('email') !== undefined){
            var addresses = JSON.parse($.cookie('address')); 
            var keys = Object.keys(addresses);
            if(keys.length > 0){
                for(var i = 0; i < keys.length ; i++){
                    if($(this).val() === keys[i])
                        $(this).val(addresses[keys[i]]);
                }
            }
        }
    });
    
    //automatically changes the destination field if the value equals to the key of an address 
    $("#originDestinationForm input[name='destination']").on('keyup change',function(){
        if($.cookie('email') !== undefined){
            var addresses = JSON.parse($.cookie('address')); 
            var keys = Object.keys(addresses);
            if(keys.length > 0){
                for(var i = 0; i < keys.length ; i++){
                    if($(this).val() === keys[i])
                        $(this).val(addresses[keys[i]]);
                }
            }
        }
    });
    
});


