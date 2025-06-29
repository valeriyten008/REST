async function getAllUsers() {
    let get = await fetch('/main-page/admin');
    let html = ``;
    if (get.ok) {
        const table = document.querySelector("#tableUsers tbody")
        let json = await get.json();
        json.forEach(users => {
            html += `
            <tr class="table-light align-middle table-striped" style="height: 50px">
                <td>${users.id}</td>
                <td>${users.firstName}</td>
                <td>${users.lastName}</td>
                <td>${users.age}</td>
                <td>${users.email}</td>
                <td>${users.roles.map(role => role.name).join(", ")}</td>
                <td>
                    <button class="btn btn-primary" data-userid="${users.id}" data-action="edit" id="..." type="button" value="edit">Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger"  data-userid="${users.id}" data-action="delete" id="..." type="button" value="delete">Delete</button>
                </td>
            </tr>
            `
        })
        table.innerHTML = html;
    } else {
        alert("Ошибка HTTP" + get.status);
    }
    let buttonModal = document.querySelectorAll('#tableUsers > tbody > tr > td > button')
    buttonModal.forEach(elem => elem.addEventListener('click', function (evt) {
        const myModal = new bootstrap.Modal(document.getElementById('modal'), {
            keyboard: true,
            backdrop: true,
        });
        let targetButton = $(evt.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');
        $('#modal').attr('data-userid', buttonUserId);
        $('#modal').attr('data-action', buttonAction);
        myModal.show();
    }))

}

async function getUser() {
    let get = await fetch('main-page/user');
    if (get.ok) {
        const table = document.querySelector("#tableUsersUser tbody")
        let json = await get.json();
        let html = `
            <tr class="table-light align-middle" style="height: 50px">
                <td>${json.id}</td>
                <td>${json.firstName}</td>
                <td>${json.lastName}</td>
                <td>${json.age}</td>
                <td>${json.email}</td>
                <td>${json.roles.map(role => " " + role.name)}</td>
            </tr>
        `
        table.innerHTML = html;
    } else {
        alert("Ошибка HTTP" + get.status);
    }
}

//TAB
document.addEventListener("DOMContentLoaded", async () => {

    document.querySelector('#v-pills-admin-tab').addEventListener("click", async () => {
        activateAdminTab();
        await getAllUsers();
    });

    document.querySelector('#v-pills-user-tab').addEventListener('click', async () => {
        activateUserTab();
        await getUser();
    });
});

function activateAdminTab() {
    document.getElementById("v-pills-admin-tab").classList.add("active");
    document.getElementById("v-pills-user-tab").classList.remove("active");

    document.getElementById("v-pills-admin").classList.add("show", "active");
    document.getElementById("v-pills-user").classList.remove("show", "active");
}

function activateUserTab() {
    document.getElementById("v-pills-user-tab").classList.add("active");
    document.getElementById("v-pills-admin-tab").classList.remove("active");

    document.getElementById("v-pills-user").classList.add("show", "active");
    document.getElementById("v-pills-admin").classList.remove("show", "active");
}





let elemModal = document.querySelector('#modal');

 elemModal.addEventListener("show.bs.modal",  async function (evt) {
     let thisModal = $(evt.target);
     let userid = document.querySelector('#modal').getAttribute('data-userid');
     let action = document.querySelector('#modal').getAttribute('data-action');
     if (action === 'edit') {
         await editUser(userid, thisModal);
     } else if (action === 'delete') {
         await deleteUser(userid, thisModal);
     }
 })
 elemModal.addEventListener("hidden.bs.modal", function (evt) {
     let thisModal = $(evt.target);
     thisModal.attr('data-action', '');
     thisModal.attr('data-userid', '');
     thisModal.find('.modal-title').html(``);
     thisModal.find('.modal-body').html(``);
     thisModal.find('.modal-footer').html(``);
 })

 elemModal.addEventListener("hidePrevented.bs.modal", function (evt) {
     let thisModal = $(evt.target);
     thisModal.attr('data-action', '')
     thisModal.attr('data-userid', '')
     thisModal.find('.modal-title').html(``);
     thisModal.find('.modal-body').html(``);
     thisModal.find('.modal-footer').html(``);
 })