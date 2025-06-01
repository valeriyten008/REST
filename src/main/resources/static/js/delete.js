async function deleteUser(id, modal) {
    let myModal = document.querySelector('#modal-body');
    let getOneUser = await fetch(`/main-page/admin/${id}`);
    let json = getOneUser.json();
    document.getElementById("modalTitle").innerHTML = "Delete user";
    document.getElementById("modal-footer").innerHTML =
        `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary" id="modalBtn">Delete</button>`;
    json.then(json => {
        let html =`
    <form id="deleteForm">
        <div class="d-flex flex-column align-items-center">
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Id</h6>
                <input disabled style="width: 400px;" class="form-control" type="text" name="id" value="${json.id}">
            </div>
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">First Name</h6>
                <input disabled style="width: 400px;" class="form-control" type="text" name="firstName" value="${json.firstName}">
            </div>
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Last Name</h6>
                <input disabled style="width: 400px;" class="form-control" type="text" name="lastName" value="${json.lastName}">
            </div>
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Age</h6>
                <input disabled style="width: 400px;" class="form-control" type="text" name="age" value="${json.age}">
            </div>
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Email</h6>
                <input disabled style="width: 400px;" class="form-control" type="text" name="email" value="${json.email}">
            </div>
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Password</h6>
                <input name="password" type="password" disabled style="width: 400px;" class="form-control" id="password" value="${json.password}">
            </div>
            <div class="mb-3">
                <h6 class="text-dark fw-bold text-center">Role</h6>
                <select disabled style="width: 400px;" class="form-select" multiple name="listRoles" required="required">
                    <option value="1">ADMIN</option>
                    <option selected="selected" value="2">USER</option>
                </select>
            </div>
        </div>
    </form>
    `
        myModal.innerHTML = html;

    })
    document.getElementById("modalBtn").onclick = async function () {
        const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
        const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

        const deleteResponse = await fetch(`/main-page/admin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                [header]: token
            }
        });

        if (deleteResponse.ok) {
            await getAllUsers();
            modal.modal('hide');
        } else {
            alert("Error deleting user");
        }
    };
}