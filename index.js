
const apiKey = '825dcc91205501c25f7a9e1bfb75bdc2'
let city = ''
const success = (position) =>{
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    var token = "e0ba6e9da8d4cb49f5c26c926aab890a2079c360";
    var query = {lat: position.coords.latitude, lon: position.coords.longitude};
    console.log(query)
    let currentCity = ''
    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
    }
    function changeBg(data) {
        if (data.weather[0].main === 'Clouds') {
            document.body.removeAttribute('class');
            document.body.classList.add('bg-cloudy');
        }
        if (data.weather[0].main === 'Clear') {
            document.body.removeAttribute('class');
            document.body.classList.add('bg-clear');
        }
        if (data.weather[0].main === 'Rain') {
            document.body.removeAttribute('class');
            document.body.classList.add('bg-rain');
        }
    }

    function addInfo(data){
        document.querySelector('.user__city').textContent = ''
        document.querySelector('.weather__city').textContent = data.name;
        //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
        document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;' + 'C';
        document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
        document.querySelector('.weather__icon').innerHTML = `<img width="35" height="30" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        document.querySelector('.weather__wind').textContent = ` Wind speed: ${data.wind.speed} m/s`;
        document.querySelector('.weather__humidity').textContent = `Humidity: ${data.main.humidity}%`
    }

    fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
 currentCity = data.suggestions[0].data.city
            console.log(data)})
        .then(function () {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`).then(function (resp) {
                return resp.json()
            }).then(function (data) {
                console.log(currentCity)
                addInfo(data)
                changeBg(data)

                function enter() {
                            document.querySelector('input').addEventListener('keydown', function (e) {
                                if (e.keyCode === 13) {
                                    getInput()
                                }
                            });
                        }
                        enter()

                        let btnValue = document.getElementById("btn");
                        btnValue.addEventListener('click', getInput);
                        function getInput() {
                            city = document.getElementById('text').value.trim();
                            console.log(city);
                            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(function (resp) {
                                return resp.json()
                            }).then(function (data) {
                                console.log(data)
                                console.log(data.message)
                                if(data.message==='city not found'){
                                    document.querySelector('.weather__humidity').textContent = '';
                                    document.querySelector('.weather__wind').textContent = '';
                                    document.querySelector('.weather__icon').textContent = '';
                                    document.querySelector('.weather__desc').textContent = '';
                                    document.querySelector('.weather__forecast').textContent = 'City not found';
                                }
                                addInfo(data)
                                changeBg(data)
                            })
                        }
                    })
                    .catch(error => console.log(error));
        })
  }
const error = () =>{
    const refuse = document.querySelector('.text__no__permission')
    refuse.style.display = 'block'
}

navigator.geolocation.getCurrentPosition(success, error)
