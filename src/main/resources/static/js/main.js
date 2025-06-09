document.addEventListener("DOMContentLoaded", async function verification() {
    const userResponse = await fetch('/main-page/user');
    const userData = await userResponse.json();
    const roles = userData.roles.map(role => role.name);

    const isUser = roles.includes("ROLE_USER") && !roles.includes("ROLE_ADMIN");

    if (isUser) {
        document.getElementById("v-pills-admin-tab").style.display = "none";
        activateUserTab();
        await getUser();
    } else {
        activateAdminTab();
        await getAllUsers();
        activateUserTab();
        await getUser();
    }

    // обработчики переключения вкладок
    document.querySelector('#v-pills-admin-tab').addEventListener("click", async () => {
        activateAdminTab();
        await getAllUsers();
    });

    document.querySelector('#v-pills-user-tab').addEventListener('click', async () => {
        activateUserTab();
        await getUser();
    });
});



