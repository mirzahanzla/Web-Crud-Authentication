let nameLabel = document.querySelector(".name > .data-value");
let genderLabel = document.querySelector(".gender > .data-value");
let interestsLabel = document.querySelector(".interest > .data-value");
let countryLabel = document.querySelector(".country > .data-value");
let cityLabel = document.querySelector(".city > .data-value");

let name = document.getElementById("name");
let genders = document.querySelectorAll("input[type='radio']");
let interests = document.querySelectorAll("input[type='checkbox']");
let country = document.getElementById("country");
let city = document.getElementById("city");
const userContainer = document.querySelector(".users-data");
const form = document.forms[0];

let locationData;
let usersData;

function getRequest(requestType, URL) {
    let xhr = new XMLHttpRequest();
    xhr.open(requestType, URL, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                locationData = JSON.parse(xhr.response);
                locationData = locationData['countries'];
                for (let { name, cities } of locationData) {
                    const option = document.createElement("option");
                    option.setAttribute("value", name);
                    option.textContent = name;
                    country.appendChild(option);
                }
                populateCityDropdown(null);
            }
        }
    }

    xhr.send();
}

function populateCityDropdown(loadedCity) {
    city.innerHTML = '';
    let cityAlreadyExists = false;
    for (let { name, cities } of locationData) {
        if (country.value == name) {
            for (let cityVal of cities) {
                const option = document.createElement("option");
                option.setAttribute("value", cityVal);
                option.textContent = cityVal;
                city.appendChild(option);
                if (cityVal === loadedCity) {
                    option.selected = true;
                    cityAlreadyExists = true;
                }
            }
            if (typeof(loadedCity) == 'object' && cities.length > 0) {
                cityAlreadyExists = true;
                city.value = cities[0];
            }
        }
    }

    if (!cityAlreadyExists) {
        const option = document.createElement("option");
        option.setAttribute("value", loadedCity);
        option.textContent = loadedCity;
        option.selected = true;
        city.appendChild(option);
    }
}

country.onchange = populateCityDropdown;

form.onsubmit = (event) => {
    formData = new FormData(form);
    nameLabel.textContent = formData.get('name');
    genderLabel.textContent = formData.get('gender');
    let interestString = '';
    for (let interest of interests) {
        if (interest.checked) {
            interestString += interest.value + ", ";
        }
    }

    interestsLabel.textContent = interestString;
    countryLabel.textContent = formData.get('country');
    cityLabel.textContent = formData.get('city');

    event.preventDefault();
}

function loadUserName(requestType, URL) {
    let xhr = new XMLHttpRequest();
    xhr.open(requestType, URL, true);
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                users = xhr.response;
                users = users['users'];
                for (let { name } of users) {
                    let userName = document.createElement("div");
                    userName.textContent = name;
                    userName.onclick = fillUserForm;
                    userContainer.appendChild(userName);
                }
            }
        }
    }

    xhr.send();
}

function fillUserForm(event) {
    let selectedUser = event.target.textContent;

    for (let userData of users) {
        if (userData['name'] == selectedUser) {
            name.value = userData['name'];
            for (let gender of genders) {
                if (gender.value == userData['gender']) {
                    gender.checked = true;
                    break;
                }
            }
            for (let interest of interests) {
                if (interest.value == userData['interest']) {
                    interest.checked = true;
                } else {
                    interest.checked = false;
                }
            }
            country.value = userData['country'];
            populateCityDropdown(userData['city']);
        }
    }
    console.log(event.target.textContent);
}

window.onload = () => {
    getRequest("GET", "http://192.155.90.208/locations.json?b=1");
    loadUserName("GET", "http://192.155.90.208/users.json");
}
