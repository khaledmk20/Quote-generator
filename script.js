// console.log("hello world");
const quoteGenerator = document.querySelector(".quote-generator");
const tweetBtn = document.querySelector(".publish-btn");
const author = document.querySelector("#quote-author");
const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.getElementById("quote");
const loader = document.getElementById("loader");

let data = [];
//show loading function
const renderSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// hide loading
const hideLoadingSpinner = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = function () {
  renderSpinner();
  const quote = data[Math.floor(Math.random() * data.length)];
  if (!quote.author) {
    author.textContent = "Unknown";
    quoteText.textContent = quote.text;
  } else {
    quoteText.textContent = quote.text;
    author.textContent = quote.author;
  }

  // check Quote lenght to determine styling
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // set quote and hide loader
  quote.textContent = quote.text;
  hideLoadingSpinner();
};

//Get all quotes from api
const getQuote = async function () {
  renderSpinner();
  try {
    const res = await fetch("https://type.fit/api/quotes");
    data = await res.json();

    // choose a singel random quote
    newQuote();
  } catch (error) {
    console.error("Error:", error);
  }
};

const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
};

// generate new quote
quoteGenerator.addEventListener("click", getQuote);

// puplish a new tweet
tweetBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
