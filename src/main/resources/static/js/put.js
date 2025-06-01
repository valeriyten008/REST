async function editUser(id, modal) {
    let myModal = document.querySelector('#modal-body');
    let getOneUser = await fetch(`/main-page/admin/${id}`);
    let json = getOneUser.json();
    document.getElementById("modalTitle").innerHTML = "Edit user";
    document.getElementById("modal-footer").innerHTML =
        `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="submit" class="btn btn-primary" id="modalBtn">Edit</button>`;
    json.then(json =>{
        let htmlEdit = `
    <form id="editUser">
       <div class="d-flex flex-column align-items-center">
           <div class="mb-3">
               <h6 class="text-dark fw-bold text-center">ID</h6>
               <input type="text" name="editId" style="width: 400px;" class="form-control" id="editId" value="${json.id}" disabled>
           </div>
           <div class="mb-3">
               <h6 class="text-dark fw-bold text-center">First Name</h6>
               <input name="editFirstName" style="width: 400px;" class="form-control" type="text" id="editFirstName"  value="${json.firstName}">
           </div>
           <div class="mb-3">
               <h6 class="text-dark fw-bold text-center">Last Name</h6>
               <input name="editLastName" style="width: 400px;" class="form-control" type="text" id="editLastName"  value="${json.lastName}">
           </div>
           <div class="mb-3">
               <h6 class="text-dark fw-bold text-center">Age</h6>
               <input name="editAge" style="width: 400px;" class="form-control" type="text" id="editAge" value="${json.age}">
           </div>
           <div class="mb-3">
               <h6 class="text-dark fw-bold text-center">Email</h6>
               <input name="editEmail" style="width: 400px;" class="form-control" type="text" id="editEmail" value="${json.email}">
           </div>
           <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Password</h6>
                <input name="editPassword" type="password" style="width: 400px;" class="form-control" id="editPassword" value="${json.password}">
           </div>
           <div class="mb-3">
               <h6 class="text-dark fw-bold text-center">Role</h6>
               <select style="width: 400px;" id="editRole" class="form-select" multiple  id="editRole" required="required">
                   <option value="1">ADMIN</option>
                   <option selected="selected" value="2">USER</option>
               </select>
           </div>
       </div>
   </form>`
        myModal.innerHTML = htmlEdit;
    })

    document.getElementById("modalBtn").addEventListener('click', async function (evt){
        evt.preventDefault()
        let editForm = document.querySelector('#editUser');
        let id = editForm.editId.value;
        let firstName = editForm.editFirstName.value;
        let lastName = editForm.editLastName.value;
        let age = editForm.editAge.value;
        let email = editForm.editEmail.value;
        let password = editForm.editPassword.value;
        let getRole = () => {
            let array = [];
            let roleSelect = document.querySelector('#editRole');
            for (let i = 0; i < roleSelect.options.length; i++) {
                if (roleSelect.options[i].selected) {
                    let roleName = roleSelect.options[i].text;
                    let roleId = roleSelect.options[i].value;
                    array.push({
                        id: roleId,
                        name: 'ROLE_' + roleName
                    });
                }
            }
            return array;
        }


        let updatedUser = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: getRole()
        }

        const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
        const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

        let update = await fetch(`/main-page/admin/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                [header]: token
            },
            body: JSON.stringify(updatedUser)
        });

        if (update.ok) {
            await getAllUsers();
            modal.modal('hide');
        } else {
            alert("Failed to update user");
        }
    })
}