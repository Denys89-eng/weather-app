const apiKey = 'ff1ab588767c4393b3e143756232301';
//
//
//
//


let form = document.querySelector('.form'),
    input = document.querySelector('.input'),
    header = document.querySelector('.header')


form.onsubmit = function (e) {
    e.preventDefault();
    let city = input.value.trim();

    const url = ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)


            if (data.error) {

                const prevCard = document.querySelector('.card')
                if (prevCard) prevCard.remove()

                const html = `<div class="card">${data.error.message}</div>`
                header.insertAdjacentHTML('afterend', html)

            } else {
                const prevCard = document.querySelector('.card')
                if (prevCard) {
                    prevCard.remove()
                }


                let html = `<div class="card">
                    <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
                
                    <div class="card-weather">
                        <div class="card-value">${data.current.temp_c}°C</div>
                        <div class="card-image"><img src="img/8.png" alt=""></div>
                    </div>
                
                    <div class="card-descr">${data.current.condition.text}</div>
                
                </div>`

                header.insertAdjacentHTML('afterend', html)
            }
        })
}

