let isUser = true;
//Проверка роли
document.addEventListener("DOMContentLoaded", async function verification() {
    const roles = await fetch('main-page/user');
    let role = "";
    let json = await roles.json();
    for (let i = 0; i < json.roles.length; i++) {
        role = json.roles[i].name
        if (role === "ADMIN") {
            isUser = false;
        }
    }
    if (isUser) {
        document.getElementById("v-pills-user-tab").classList.add("active");
        document.getElementById("v-pills-user").classList.add("show", "active");
        document.getElementById("v-pills-admin-tab").remove();
        document.getElementById("v-pills-admin").remove();
        await getUser();
    } else {
        document.getElementById("v-pills-admin-tab").classList.add("active");
        document.getElementById("v-pills-admin").classList.add("show", "active");
        await getAllUsers();
    }
})


