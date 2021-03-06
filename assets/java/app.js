
// 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='


//Creating buttons and getting the value
const getGif = () => {
  let someGif = document.querySelector('#emotion-input').value
  gifApi(someGif)
  document.querySelector('#emotion-input').value = ''

  let insertGif = document.createElement('button')
  insertGif.className = 'emotions'
  insertGif.setAttribute('data-emotions', someGif)
  insertGif.textContent = someGif
  document.querySelector('#insert').append(insertGif)
}



const gifApi = (content) => {

  fetch(`https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${content}&limit=10&rating=g`)
    .then(r => r.json())
    .then(r => {
      // console.log(r)
      for (let i = 0; i < 10; i++) {
        let gifElem = document.createElement('div')
        let gifContent
        let { url: still } = r.data[i].images.fixed_height_still
        let { url: animated } = r.data[i].images.fixed_height

        //I just put a Static " rating " to appear together with the gif
        gifElem.className = 'gifImg'
        gifContent = `
          <img class="gif" src="${still}" alt="${content}" data-still="${still}" data-animated="${animated}" >
          <br>
          rating is g
          `
        gifElem.innerHTML = gifContent

        document.getElementById('gifDiv').append(gifElem)



      }
    })
    .catch(e => console.error(e))
}

document.querySelector('#emotion-form').addEventListener('click', e => {
  e.preventDefault()
})

document.addEventListener('click', ({ target }) => {

  if (target.className === 'emotions') {
    let { emotions } = target.dataset
    gifApi(emotions)

  } else if (target.className === 'gif') {
    let { still, animated } = target.dataset
    if (target.src === still ) {
      target.setAttribute('src', animated)
    } else if (target.src === animated) {
      target.setAttribute('src', still)
    }


  }


})

