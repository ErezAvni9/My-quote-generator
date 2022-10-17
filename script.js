const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
const emailQuoteBtn = document.getElementById('email')
const clock = document.querySelector('.clock')

let apiQuotes = []

// Clock function to show the current time.
const tick = () => {
 
   const now = new Date()

   const h = now.getHours()
   const m = now.getMinutes()
   const s = now.getSeconds()

   const html = `
     <span>${h}</span> :
     <span>${m}</span> :
     <span>${s}</span> 
     `
     clock.innerHTML = html
}

setInterval(tick, 1000)

function showLoadingSpinner() {
   loader.hidden = false
   quoteContainer.hidden = true
}

function removeLoadingSpinner() {
   quoteContainer.hidden = false
   loader.hidden = true 
}

// Show New Quote
function newQuote() {
   showLoadingSpinner()
  // Pick a random quote from apiQuotes array  
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // Check if Author field is blank and replace it with 'Unknown
  if (!quote.author) {
     authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }
  // Check Quote length to determine the styling
  if(quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text
  removeLoadingSpinner()
}

// Get Quotes From API
async function getQuotes() {
   showLoadingSpinner()
   const apiUrl = 'https://type.fit/api/quotes'
   try {
      const response = await fetch(apiUrl)
      apiQuotes = await response.json()
      newQuote()
   } catch (error) {
    // Catch Error Here
   }
}


// Tweet Quote 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')  
}
// this function send the quote by email, not real only demo.
function emailQuote() {
   window.open(email, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
emailQuoteBtn.addEventListener('click', emailQuote)

// On Load
getQuotes()
