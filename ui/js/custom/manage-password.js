var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(passwordListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, password) {
                table += '<tr data-id="'+ password.pass_id +'" data-platform="'+ password.platform +'" data-platform-id="'+ password.platform_id +'" data-password="'+ password.password +'">' +
                    '<td>'+ password.platform +'</td>'+
                    '<td>'+ password.platform_id +'</td>'+
                    '<td>'+ password.password +'</td>'+
                    '<td><span class="btn btn-xs btn-danger delete-password">Delete</span></td></tr>';
            });
            $("table").find('tbody').empty().html(table);
        }
    });
});
    // Save Product
$("#loginForm").submit(function(event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    // Check if the username and password match the preset credentials
    if (username === "admin" && password === "password") {
        // Redirect to the main page after successful login
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});


$('#logoutButton').click(function() {
        window.location.href = 'login.html'; // Redirect to the login page
    });
$("#savePassword").on("click", function () {
    var data = $("#passwordForm").serializeArray();
    var requestPayload = {
        platform: null,
        platform_id: null,
        password: null
    };
    for (var i=0; i<data.length; ++i) {
        var element = data[i];
        switch(element.name) {
            case 'platform':
                requestPayload.platform = element.value;
                break;
            case 'platform_id':
                requestPayload.platform_id = element.value;
                break;
            case 'password':
                requestPayload.password = element.value;
                break;
        }
    }
        callApi("POST", passwordSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-password", function (){
        var tr = $(this).closest('tr');
        var data = {
            pass_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", passwordDeleteApiUrl, data);
        }
    });



    
    productModal.on('hide.bs.modal', function(){
    $("#platform, #platform_id, #password").val('');
    productModal.find('.modal-title').text('Add New Password');
});


