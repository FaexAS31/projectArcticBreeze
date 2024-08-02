import { getUsers, updateUser, deleteUser, addUser } from '../../js/providers/users.js';

const users = await getUsers();

export const init = () => {
    loadUsers();
    document.querySelector('#addUser').addEventListener('click', addNewUser);
};

function loadUsers() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    users.forEach((user, index) => {
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
                <button onclick="editUser(${user.userID})">Edit</button>
                <button onclick="deleteUser(${user.userID})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};
