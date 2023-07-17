
//Request location
/*navigator.geolocation.getCurrentPosition(function(position) {
    //findNear();
});


if ("geolocation" in navigator) {
alert('kr')
} else {
alert('nio')
}*/



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

    fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
            document.querySelector('.user__city').textContent = ` Your current city: ${data.suggestions[0].value.split(',')[1].split(' ')[2]}`;
 currentCity = data.suggestions[0].value.split(',')[1].split(' ')[2]
            console.log(data)})
        .then(function (){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`).then(function (resp) {return resp.json() }).then(function (data) {
                console.log(currentCity)



                //добавляем название города
                document.querySelector('.weather__city').textContent = data.name;
                //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
                document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;'+'C';
                //Добавляем описание погоды
                document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
                //Добавляем иконку погоды
                document.querySelector('.weather__icon').innerHTML = `<img width="35" height="30" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
                document.querySelector('.weather__wind').textContent = ` Wind speed: ${data.wind.speed} m/s`;
                document.querySelector('.weather__humidity').textContent = `Humidity: ${data.main.humidity}%`;
                console.log(data.weather[0].main)
                if(data.weather[0].main === 'Clouds'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-cloudy');
                }if(data.weather[0].main === 'Clear'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-clear');
                }if(data.weather[0].main === 'Rain'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-rain');
                };

            })
              /*  .then(function (){
                    if(data.weather[0].main === 'Clouds'){
                        document.body.removeAttribute('class');
                        document.body.classList.add('bg-cloudy');
                    }if(data.weather[0].main === 'Clear'){
                        document.body.removeAttribute('class');
                        document.body.classList.add('bg-clear');
                    }if(data.weather[0].main === 'Rain'){
                        document.body.removeAttribute('class');
                        document.body.classList.add('bg-rain');
                    };
               // })*/

                .catch(function () {
                    //Обрабатываем ошибки
                })
        })
        .catch(error => console.log("error", error));
        }











    const apiKey = '825dcc91205501c25f7a9e1bfb75bdc2'
    let city = ''

    function enter() {
        document.querySelector('input').addEventListener('keydown', function(e) {
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
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(function (resp) {return resp.json() }).then(function (data) {
console.log(data)
            document.querySelector('.user__city').textContent = ''
            //добавляем название города
            document.querySelector('.weather__city').textContent = data.name;
            //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
            document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;'+'C';
            //Добавляем описание погоды
            document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
            //Добавляем иконку погоды
            document.querySelector('.weather__icon').innerHTML = `<img width="35" height="30" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.weather__wind').textContent = ` Wind speed: ${data.wind.speed} m/s`;
            document.querySelector('.weather__humidity').textContent = `Humidity: ${data.main.humidity}%`;
            if(data.weather[0].main === 'Clouds'){
                document.body.removeAttribute('class');
                document.body.classList.add('bg-cloudy');
            }if(data.weather[0].main === 'Clear'){
                document.body.removeAttribute('class');
                document.body.classList.add('bg-clear');
            }if(data.weather[0].main === 'Rain'){
                document.body.removeAttribute('class');
                document.body.classList.add('bg-rain');
            }if(data.weather[0].main === 'Clouds'){
                document.body.removeAttribute('class');
                document.body.classList.add('bg-cloudy');
            }
        })
           /* .then(function (){
                if(data.weather[0].main === 'Clouds'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-cloudy');
                }if(data.weather[0].main === 'Clear'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-clear');
                }if(data.weather[0].main === 'Rain'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-rain');
                }if(data.weather[0].main === 'Clouds'){
                    document.body.removeAttribute('class');
                    document.body.classList.add('bg-cloudy');
                }
          //  })*/
            .catch(function () {
                //Обрабатываем ошибки
            })

    }


const error = () =>{
    const refuse = document.querySelector('.text__no__permission')
    refuse.style.display = 'block'
}

navigator.geolocation.getCurrentPosition(success, error)


/*const apiKey = '825dcc91205501c25f7a9e1bfb75bdc2'
let city = ''
let btnValue = document.getElementById("btn");
btnValue.addEventListener('click', getInput);
function getInput() {
     city = document.getElementById('text').value.trim();
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(function (resp) {return resp.json() }).then(function (data) {

        //добавляем название города
        document.querySelector('.weather__city').textContent = data.name;
        //data.main.temp содержит значение в Кельвинах, отнимаем от  273, чтобы получить значение в градусах Цельсия
        document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
        //Добавляем описание погоды
        document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
        //Добавляем иконку погоды
        document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    })

        .catch(function () {
            //Обрабатываем ошибки
        })

}*/






/*
let arrWeather = []
async function getResponse(){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    arrWeather = await response.json()
    return arrWeather

}
getResponse()



*/