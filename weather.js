const input = document.getElementById('weatherinp');
const searchbtn = document.getElementById('search'); 
let inpval = input.value;

//fetching data through ENTER key
input.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13){
        e.preventDefault();
        searchbtn.click();
    }
});

// Fetching data from openweatherapi
// fetch data through search button
searchbtn.addEventListener('click',() => {
      if(input.value == ""){
             alert('Enter city name');
         } else{
                let city = input.value;
            input.value="";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d7f19f95787a7e149e0bdaeddad3cf6`)
        .then( res =>{
         return res.json();
        }).then(function(data) {
           let city = document.getElementById('city');
           city.innerHTML=`${data.name}, ${data.sys.country}`;
           let temp = document.getElementById('temp');
           temp.innerHTML=`${(Math.floor(data.main.temp - 273))}&deg; C`;
           let des = document.getElementById('des');
           des.innerHTML=`${data.weather[0].main}`;
           let speed = document.getElementById('speed');
           let humidity = document.getElementById('humidity');
           speed.innerHTML=`<h5 id="speed"><ion-icon name="snow-outline"></ion-icon> Wind : ${Math.floor(data.wind.speed)} km/h</h5>`;          
           humidity.innerHTML=`   <h5 id="humidity"><ion-icon name="thermometer-outline"></ion-icon> Humdity : ${data.main.humidity}%</h5>`;
           let today = document.getElementById('today');
           let todayDate = new Date();
           today.innerHTML= dateManage(todayDate);
            
         })
         .catch( (error) =>{
             alert("Match not found");
         });
            
       }
});

// date management

function dateManage(currentdate){
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let year = currentdate.getFullYear();
    let month = months[currentdate.getMonth()];
    let date = currentdate.getDate();
    let day = days[currentdate.getDay()];
    let hr = currentdate.getHours();
    let min = currentdate.getMinutes();
    if(hr < 10){
        hr = "0" + hr;
    }
    if(min < 10){
        min = "0" + min;
    }
    return `${date} ${month} ${year} ${day} ${hr}:${min}`;

}