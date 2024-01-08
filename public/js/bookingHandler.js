async function submitBooking() {
  const roomType = document.getElementById('roomType').value;
  const checkInDate = document.getElementById('checkInDate').value;
  const checkOutDate = document.getElementById('checkOutDate').value;

  const currentUseer = await getThis("user", "me");
  const user = currentUseer.data.id;
  const bookingData = {
    user,
    roomType,
    checkInDate,
    checkOutDate
  };

  console.log(bookingData);

  fetch('http://localhost:8000/api/bookings', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('bookingResult').innerHTML = `<center>Booking successful!<br />Booking ID: ${data._id}<center>`;
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('bookingResult').innerHTML = '<center>Error during booking. Please try again.</center>';
  });

  location.reload();
}
