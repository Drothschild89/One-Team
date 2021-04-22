const form = document.querySelector("#form");

const fetchToken = (email) => {
  alert("Execution Started");
  fetch("https://extole-api.extole.io/api/v5/token", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`Got access token: ${data.access_token}`);
      setEmail(data.access_token, email);
    });
};

const setEmail = (token, email) => {
  alert(`Updating with email: ${email}`);
  fetch(`https://extole-api.extole.io/api/v4/me?access_token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`Got result: ${data.status}`);
      createShareLink(token);
    });
};

const handleSubmit = (e) => {
  e.preventDefault();
  fetchToken(e.target.email.value);
};
form.addEventListener("submit", handleSubmit);

const createShareLink = (token) => {
  fetch(
    `https://extole-api.extole.io/api/v6/me/shareables?access_token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: "refer-a-friend" }),
    }
  )
    .then((res) => res.json())
    .then((data) => alert(`Share Link: ${data.link}`));
};
