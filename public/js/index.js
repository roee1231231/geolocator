const { response } = require("express")

const elements = {
    searchForm: document.getElementById('search-form'),
    textInput: document.getElementById('text-input'),
    cardsContainer: document.getElementById('cards-container'),
    statusMessage: document.getElementById('status-message')
}

const renderCard = (data) => {
    const languages = (lans) => {
        const lst = lans.map(lan => lan.name)
        return lst.join(', ')
    }
    // const emoji = emoji => {
    //     result = '&#x' + emoji.split(' ')[0].slice(2) + 'a;'
    //     console.log(result)
    //     return result
    // }
    // ${emoji(data.location.country_flag_emoji_unicode)}&#1F1EE;&#1F1F1;
    markUp = `
    <div class="ip-card">
        <h3 style="text-decoration:underline;text-align:center;">${data.ip}</h3>
        <p><b>Country: </b>${data.country_name}</p>
        <p><b>Estimated city: </b>${data.region_name}</p>
        <p><b>Spoken languages: </b>${languages(data.location.languages)}</p>
        <p><b>Calling code: </b>${data.location.calling_code}</p>
    </div>`
    elements.cardsContainer.insertAdjacentHTML('beforeend', markUp)
    elements.statusMessage.innerHTML = ''
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/myip').then((data) => {
        data.json().then((data) => {
            try{
                renderCard(data.body)
            } catch {
                console.log('problem fetching your ip data')
            }
        })
    })
})

elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    elements.statusMessage.innerHTML = 'Searching...'
    try {
        fetch(`/search?query=${elements.textInput.value}`).then((data) => {
            data.json().then((data) => {
                console.log(data.body)
                try {
                    renderCard(data.body)
                } catch {
                    alert('Invalid input entered in the search')
                    elements.statusMessage.innerHTML = ''
                }
            })
        })
    } catch (error) {
        elements.statusMessage.innerHTML = 'Error fetching from local server'
    }
})