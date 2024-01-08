const reviewsSection = document.getElementById("reviews");
const review = document.getElementById("newReview");

window.addEventListener("DOMContentLoaded", async function() {
    init();
});

function showReview(review) {
    reviewsSection.innerHTML += `<br><span class="text-red-800">New review: </span>${review}`;
    review.value = "";
}

let ws;
function init() {
    if(ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
    }

    ws = new WebSocket("ws://localhost:5000");
    ws.onopen = () => {
        console.log("connection opened");
    };

    ws.onmessage = ({data}) => showReview(data);
    ws.onclose = function () {
        ws = null;
    }
}

document.getElementById("addReview").onclick = async () => {
    const newReview = await postThis({review: review.value}, "review", "add");
    if(newReview.wasItASuccess) {
        // add the the web socket
        if(!ws) {
            showReview("No Connection");
            return;
        }

        ws.send(review.value);
        showReview(review.value);
    }
};

init();