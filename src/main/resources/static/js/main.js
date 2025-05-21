let isUser = true;
//Проверка роли
document.addEventListener("DOMContentLoaded", async function verification() {
    const roles = await fetch('main-page/user');
    let role = "";
    let json = await roles.json();
    for (let i = 0; i < json.roles.length; i++) {
        role = json.roles[i].roles
        if (role === "ADMIN") {
            isUser = false;
        }
    }
    if (isUser) {
        document.getElementById("user-tab").classList.add("active");
        document.getElementById("user").classList.add("show", "active");
        await getUser();
    } else {
        document.getElementById("admin-tab").classList.add("active");
        document.getElementById("admin").classList.add("show", "active");
        await getAllUsers();
    }
})


