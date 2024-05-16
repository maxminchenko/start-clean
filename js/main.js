const emailInput = document.getElementsByClassName("email-input").item(0);
const subscribeBtn = document.getElementsByClassName("subscribe-btn").item(0);
subscribeBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  sendSubscriptionEmail(email);
});

function sendSubscriptionEmail(userEmail) {
  const formData = {
    email: userEmail,
  };
  let url = "https://api.com";

  fetch(url + "/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Subscription successful!");
        emailInput.value = "";
      } else {
        alert("Subscription failed: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to subscribe.");
    });
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
