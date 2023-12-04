let activeUser;
let userList;
let userData;
const userKey = "userList";
const contactKey = "Contacts";
const tasksKey = "allTasks";
const sessionKey = "activeUser"
const remoteKey = "allTasks";
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


function getUser(sessionKey) {
  userData = sessionStorage.getItem(sessionKey)
  activeUser=JSON.parse(userData)
  return activeUser
  }


async function setUserList(key, value) {
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


async function getUserList(key) {
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


async function getAllTasks(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
 await fetch(url)
 .then((res) => res.json())
 .then(json=>{
  let arr=json.data.value;
  let parsedArr = JSON.parse(arr);
  Array.isArray(parsedArr) ? allTasks.push([...parsedArr]):allTasks.push(parsedArr);
  return allTasks
 });

}


async function setAllTasks(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


async function setContacts(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


async function getContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
 await fetch(url)
 .then((res) => res.json())
 .then(json=>{
  let arr=json.data.value;
  contacts = JSON.parse(arr)
  return contacts
 });

}

