document.querySelector('#addNewUser').addEventListener("click", async function (evt) {
    evt.preventDefault();

    const addForm = document.querySelector('#formAddUser');

    const firstName = addForm.addFirstName.value;
    const lastName = addForm.addLastName.value;
    const age = addForm.addAge.value;
    const email = addForm.addEmail.value;
    const password = addForm.addPassword.value;

    const getRole = () => {
        let array = [];
        const role = document.querySelector('#Inputrole');
        for (let i = 0; i < role.options.length; i++) {
            if (role.options[i].selected) {
                array.push({ id: role.options[i].value });
            }
        }
        return array;
    };

    const user = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: getRole()
    };

    // 🔐 Получаем CSRF-токен и имя заголовка из <meta>
    const csrfToken = document.querySelector('meta[name="_csrf"]').content;
    const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;

    try {
        const addUser = await fetch('/main-page/admin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                [csrfHeader]: csrfToken
            },
            body: JSON.stringify(user)
        });

        if (addUser.ok) {
            await getAllUsers();

            // Очистка формы
            const addFormJQ = $('#formAddUser');
            addFormJQ.find('#firstName').val('');
            addFormJQ.find('#lastName').val('');
            addFormJQ.find('#email').val('');
            addFormJQ.find('#age').val('');
            addFormJQ.find('#password').val('');
            addFormJQ.find('#Inputrole').val('');
        } else {
            alert("Ошибка добавления: " + addUser.status);
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
});
