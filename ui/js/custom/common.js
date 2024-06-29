// Define your api here
var passwordListApiUrl = 'http://127.0.0.1:5000/getPasswords';
var passwordSaveApiUrl = 'http://127.0.0.1:5000/insertPassword';
var passwordDeleteApiUrl = 'http://127.0.0.1:5000/deletePassword';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function( msg ) {
        window.location.reload();
    });
}

function passwordParser(password) {
    return {
        pass_id: password.pass_id,
        platform: password.platform,
        platform_id: password.platform_id,
        password: password.password
    }
}

//To enable bootstrap tooltip globally
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// });