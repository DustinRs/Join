let activeUser;
let userList;
const userKey = "userList";
const contactKey = "Contacts";
const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


function logUser(name) {
    if (name.firstName) {
        activeUser = name.firstName + " " + name.lastName;
        return sessionStorage.setItem("activeUser", activeUser)
    } else {
        activeUser = name;
        return sessionStorage.setItem("activeUser", activeUser)
    }
}


async function setItem(key, value) {
  // Create a payload object with the key, value, and STORAGE_TOKEN
  const payload = { key, value, token: STORAGE_TOKEN };

  // Make a POST request to STORAGE_URL with the payload as the request body
  const response = await fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  // Parse the response as JSON and return the result
  return await response.json();
}


async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Kontakte");
    }
    const data = await response.json();
    userList = JSON.parse(data.data.value)||[];
    console.log(userList);
  } catch (error) {
    console.error(error);
  }
}