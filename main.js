const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];const monthSort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];const d = new Date();const date = d.getDate();const year = d.getFullYear();const monthSortName = monthSort[d.getMonth()];const lastMonth = month[d.getMonth() - 1];let name = month[d.getMonth()];
const barTime =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];const barapm = ["pm", "am"];const barWidth = [10, 20, 30, 40, 50, 60, 70, 80];
const api = "ffc88a036cbad32b19cc969493b4d8e4";const url = "https://api.openweathermap.org/data/2.5/weather";const openUrl = "https://api.opencagedata.com/geocode/v1/json";const openApi = "87e60f27e76345d28d43ebd2fc1753d1";

let barAndWidth = [];


// Stop Web

function SetDateTime() {
  const monthAndYear = document.querySelector("#monthAndYear");
  const datepara = document.querySelector("#Datepara");
  monthAndYear.innerHTML = `
  ${name} ${year}
  `;
  datepara.innerHTML = `
  ${date} ${monthSortName}
  `;
}

function Whether(data, city) {
  
  // wind 
  
  const windText = document.querySelector("#windText");
  windText.innerHTML = `${data.wind.speed} Km/h`;
  
  // pressure 
  
  const pressureText = document.querySelector("#pressureText");
  pressureText.innerHTML = data.main.pressure + " hpa";
  
  // rain 
  
  const rainText = document.querySelector("#rainText");
  rainText.innerHTML = data.weather[0].description;
  
  // index
  
  
  const indexText = document.querySelector("#indexText");

  
  indexText.innerHTML = city;
  
}

function getUserCurrentLocation( latitude, longitude) {
  let query = `${latitude},${longitude}`
  
  let url = `${openUrl}?key=${openApi}&q=${query}&pretty=1`;

try {
  fetch(url).then((response) => response.json()).then((data) => {
    FecthWhether(data);
    console.log(data)
  });
} catch (e) {
  console.log(e);
  error(error);
}
  
}

function getLocation() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getUserCurrentLocation( latitude, longitude);
  
}, (e) => {
  const error = document.querySelector("#error");
  
  error.style.display = "block";
  error.innerHTML = e.message + " Turn On Gps";
})
}
}

// Whether Data Fecth

function FecthWhether(data) {
  let city = data.results[0].components.country;
  let county = data.results[0].components.county;
  const urlKey = url + `?q=${city}&appid=${api}&metric=celcius`;
  
    const target = document.querySelector(".target");
  
    target.innerHTML = data.results[0].formatted;
  
  fetch(urlKey).then((response) => response.json()).then((data) => {
    Whether(data, county);
    console.log(data)
    const temprature = document.querySelector(".Temprature");
    temprature.innerHTML = "";
    temprature.innerHTML = data.main.temp - 273.15 + "°c";
  });
}

window.onload = () => {

    SetDateTime();
    getLocation();
    setBars();

  
}
  
function setBars() {
  const rainTime = document.querySelectorAll(".RainTime");
  
  
  
  rainTime[0].innerHTML = barTime[Math.floor(Math.random() * barTime.length)] + barapm[Math.floor(Math.random() * barapm.length)];
  
  rainTime[2].innerHTML = barTime[Math.floor(Math.random() * barTime.length)] + barapm[Math.floor(Math.random() * barapm.length)];
  
  rainTime[1].innerHTML = barTime[Math.floor(Math.random() * barTime.length)] + barapm[Math.floor(Math.random() * barapm.length)];
  
  
  // bar 
  
  const bar = document.querySelectorAll(".bar");
  bar[0].style.width = barWidth[Math.floor(Math.random() * barWidth.length)] + "%";
  bar[1].style.width = barWidth[Math.floor(Math.random() * barWidth.length)] + "%";
  bar[2].style.width = barWidth[Math.floor(Math.random() * barWidth.length)] + "%";
  
  barAndWidth.push(bar[0].
  style.width, bar[1].style.width, bar[2].style.width);
  
  barAndWidth.push(rainTime[0].
  innerHTML, rainTime[1].innerHTML, rainTime[2].innerHTML);
  
  localStorage.setItem("barAndWidth", barAndWidth);
  
}

