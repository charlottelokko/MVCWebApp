$(document).ready(function () {
    populateTable();
});

function populateTable() {
    $("#contacts tbody").html("");
    $.ajax({
        url: '/api/ContactsAPI',
        type: 'get',
        dataType: 'JSON',
        success: function (response) {
            let len = response.length;
            for (let i = 0; i < len; i++) {
                let id = response[i].id;
                let firstname = response[i].firstName;
                let lastname = response[i].lastName;
                let email = response[i].email;
                let phone = response[i].phone;
                let tr_str = "<tr>" +
                    "<td>" + id + "</td>" +
                    "<td>" + firstname + "</td>" +
                    "<td>" + lastname + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>" + phone + "</td>" +
                    "<td><button class='edit'>Edit</button>&nbsp;" +
                    "<button class='delete'>Delete</button></td>" +
                    "</tr>";
                $("#contacts tbody").append(tr_str);
            }
            $(document).find('.edit').on('click', function () {
                let s_id = $(this).parents('tr:first').find('td:eq(0)').text();
                populateInputs(s_id);
            });
            $(document).find('.delete').on('click', function () {
                let s_id = $(this).parents('tr:first').find('td:eq(0)').text();
                let contact = $(this).parents('tr:first').find('td:eq(1)').text();
                if (confirm("Are you sure you want to delete " + contact)) {
                    deleteContact(s_id, contact);
                }
            });
        }
    });
}

function populateInputs(c_id) {
    $.ajax({
        url: '/api/ContactsAPI/' + c_id,
        type: 'get',
        dataType: 'JSON',
        success: function (response) {
            $("#cid").text(response.id);
            $("#first").val(response.firstName);
            $("#last").val(response.lastName);
            $("#email").val(response.email);
            $("#phone").val(response.phone);
        }
    });
    $('#save').prop('disabled', false);
    $('#add').prop('disabled', true);
}

function saveContact() {
    let contact = {
        "id": parseInt($("#cid").text()),
        "firstname": $("#first").val(),
        "lastname": $("#last").val(),
        "email": $("#email").val(),
        "phone": $("#phone").val()
    };
    let contactsurl = '/api/ContactsAPI/' + $("#cid").text();
    alert(contactsurl);
    $.ajax({
        url: contactsurl,
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: function (response) {
            $("#cid").text("");
            $("#first").val("");
            $("#last").val("");
            $("#email").val("");
            $("#phone").val("");
            $('#save').prop('disabled', true);
            $('#add').prop('disabled', false);
            populateTable();
        }
    });
}

function addContact() {
    let contact = {
        "firstname": $("#first").val(),
        "lastname": $("#last").val(),
        "email": $("#email").val(),
        "phone": $("#phone").val()
    };
    $.ajax({
        url: '/api/ContactsAPI',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: function (response) {
            $("#cid").text("");
            $("#first").val("");
            $("#last").val("");
            $("#email").val("");
            $("#phone").val("");
            $('#save').prop('disabled', true);
            $('#add').prop('disabled', false);
            populateTable();
        }
    });
}

function deleteContact(c_id) {
    $.ajax({
        url: '/api/ContactsAPI/' + c_id,
        type: 'delete',
        success: function (response) {
            alert("Contact with id " + response.id + " is deleted");
            populateTable();
        }
    });
}    