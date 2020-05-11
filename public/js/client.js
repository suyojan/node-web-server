const cityName = document.querySelector('#cityName');
if(cityName){
    console.log('City name found');
}
const display = document.querySelector('#weather');
const button = document.querySelector('#btnWeather');
button.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/weather?city=' + cityName.value).then((res) => {
        res.json().then((data) => {
            display.innerHTML = JSON.stringify(data);
        })
        
    })
})