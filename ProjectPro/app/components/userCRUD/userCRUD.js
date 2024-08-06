import { getUsers,getUserById, updateUser, deleteUser, addUser } from '../../js/providers/users.js';
import Swal from 'https://cdn.skypack.dev/sweetalert2';

export const init = async () => {
    await loadUsers();
    
    document.getElementById('userCrudForm').addEventListener('submit', (e) => addFormUser(e));
    document.getElementById('userEditForm').addEventListener('submit', (e) => updateFormUser(e));
};

async function loadUsers() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';

    const users = await getUsers();

    let localUser = JSON.parse(localStorage.getItem('user'));
    let currentUser = JSON.parse(localUser);
    let currentUserID = currentUser.userID;
    console.log("currentUserID: "+currentUserID);
    

    users.forEach((user) => {
        console.log(user.userID);
        console.log(currentUserID==user.userID);
        if(currentUserID != user.userID){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.userID}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.nickname}</td>
                <td>${user.cellphone}</td>
                <td>${user.role}</td>
                <td><img src="https://arcticbreeze.blob.core.windows.net/usuariocontenedor/${user.imagePath}" alt="${user.name}" width="50"></td>
                <td>
                    <button class="btn-common edit-btn" data-id="${user.userID}">Edit</button>
                    <button class="btn-common delete-btn" data-id="${user.userID}">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);

            const editBtn = row.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => handleUserSelection(user.userID));
            }

            const deleteBtn = row.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => deleteFormUser(user.userID));
            }
        }
    });
}

async function addFormUser(event) {
    event.preventDefault();

    const form = document.getElementById("userCrudForm");
    const formData = new FormData(form);

    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    try {
        await addUser(formData);
        Swal.fire({
            title: "User added successfully!",
            confirmButtonText: "Continue",
        });
        await loadUsers();
        hideUserForm();
    } catch (error) {
        console.error('Error handling user addition:', error);
    }
}

async function deleteFormUser(userID) {
    Swal.fire({
        title: "Are you sure to delete this user?",
        showDenyButton: true,
        confirmButtonText: "Remove",
        denyButtonText: `Cancel`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteUser(userID);
            await loadUsers();
        }
    });
}

async function handleUserSelection(userID) {
    const user = await getUserById(userID);
    if (user) {
        showEditUserForm(user);
    }
}

function showEditUserForm(user) {
    document.getElementById('editUserID').value = user.userID;
    document.getElementById('editName').value = user.name;
    document.getElementById('editLastName').value = user.lastName;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editNickname').value = user.nickname;
    document.getElementById('editCellphone').value = user.cellphone;
    document.getElementById('editRole').value = user.role;

    document.getElementById('editUserForm').classList.remove('hidden');
    document.querySelector('.overlay').style.display = 'flex';
}

async function updateFormUser(event) {
    event.preventDefault();

    const form = document.getElementById("userEditForm");
    const formData = new FormData(form);
    const userID = document.getElementById("editUserID").value;

    try {
        await updateUser(userID, formData);
        Swal.fire({
            title: "User updated successfully!",
            confirmButtonText: "Continue",
        });
        await loadUsers();
        hideEditUserForm();
    } catch (error) {
        console.error('Error handling user update:', error);
    }
}

function hideUserForm() {
    document.getElementById('userForm').classList.add('hidden');
}

function hideEditUserForm() {
    document.getElementById('editUserForm').classList.add('hidden');
    document.querySelector('.overlay').style.display = 'none';
}

document.getElementById('hide-edit-form').addEventListener('click', hideEditUserForm);
