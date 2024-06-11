const documentForm = document.querySelector('form')
const search = document.querySelector('input')
const textTemprature = document.querySelector('#message-1')
const textHumidity = document.querySelector('#message-2')
const textDescription = document.querySelector('#message-3')


documentForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    textDescription.textContent = "Loading.."
    textTemprature.textContent = ""
    textHumidity.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                textTemprature.textContent = data.error;
                textDescription.textContent = '';

            } else {
                console.log("data: ", data)
                textTemprature.textContent = data.temprature;
                textHumidity.textContent = data.humidity;
                textDescription.textContent = data.description;
            }
        })
    })
})
