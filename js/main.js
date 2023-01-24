const apiKey = 'ff1ab588767c4393b3e143756232301';
//
//
//
//


let form = document.querySelector('.form'),
    input = document.querySelector('.input'),
    header = document.querySelector('.header')

function removeCard() {
    const prevCard = document.querySelector('.card')
    if (prevCard) prevCard.remove()
}

function showError(errorMessage) {
    const html = `<div class="card">${data.error.message}</div>`
    header.insertAdjacentHTML('afterend', html)
}

function showCard({name, country, temp, text}) {
    let html = `<div class="card">
                    <h2 class="card-city">${name}<span>${country}</span></h2>
                
                    <div class="card-weather">
                        <div class="card-value">${temp}°C</div>
                        <div class="card-image"><img src="img/8.png" alt=""></div>
                    </div>
                
                    <div class="card-descr">${text}</div>
                
                </div>`

    header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
    const url = ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url)
    const data = await response.json()
    return data
}

form.onsubmit = async function (e) {
    e.preventDefault();

    let city = input.value.trim();

    const data = await getWeather(city)

    if (data.error) {

        removeCard()
        showError(data.error.message)

    } else {

        removeCard()

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            text: data.current.condition.text
        }

        showCard(weatherData)

    }
}


// const info = conditions.find(
//     (obj) => obj.code === data.current.condition.code
// );
//
//  const fileName = data.current.is_day ? info.day : info.night;
//  console.log('fileName', fileName)