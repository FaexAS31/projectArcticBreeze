import { getSaleDetails, updateSaleDetail, deleteSaleDetail, addSaleDetail } from '../../js/providers/saleDetails.js';

const saleDetails = await getSaleDetails();

export const init = () => {
    loadSaleDetails();
    document.querySelector('#addSaleDetail').addEventListener('click', showAddSaleDetailForm);
};

function loadSaleDetails() {
    const tableBody = document.querySelector('#saleDetailsTable tbody');
    tableBody.innerHTML = '';
    saleDetails.forEach((detail, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detail.saleDetailID}</td>
            <td>${detail.saleID}</td>
            <td>${detail.productID}</td>
            <td>${detail.quantity}</td>
            <td>${detail.unitPrice.toFixed(2)}</td>
            <td>
                <button onclick="editSaleDetail(${detail.saleDetailID})">Edit</button>
                <button onclick="deleteSaleDetail(${detail.saleDetailID})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}