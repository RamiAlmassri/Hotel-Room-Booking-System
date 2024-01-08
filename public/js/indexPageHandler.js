// check if user is already in
window.addEventListener("DOMContentLoaded", async function() {
    const allCookies = getCookies();
    if(allCookies["user"]){
        const user = await getThis("user", "me");
        if(user.wasItASuccess) {
            getUserBookings();
        }
        document.getElementById("user-name").innerText = user.data.name;
    } else {
        window.location = "signup.html";
    }
});

async function getUserBookings() {
    const allBookings = await getThis("bookings", "userBookings");
    const bookingsTable = document.getElementById("bookings-table");
    allBookings.data.forEach(booking => {
        bookingsTable.innerHTML += `
        <tr>
            <td>${booking._id}</td>
            <td>${booking.roomType}</td>
            <td>${booking.checkInDate}</td>
            <td>${booking.checkOutDate}</td>
            <th><button onclick="deleteBooking('${booking._id}')">Delete</button></th>
        </tr>
        `;
    });
}

async function deleteBooking(id) {
    console.log(id);
    await deleteThis("bookings", "delete", id);
    location.reload();
}