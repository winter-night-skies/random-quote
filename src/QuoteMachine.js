import React, { useState, useEffect } from "react";

import crow from './bird_karasu_kowai.png';
import './QuoteMachine.css';

const errMsg = "This is currently unavailable. Try again later.";

//Visual Elements//
const quoteBtn = document.getElementById('quote-btn');
const clrArray = ["#1e1e1e", "#282828", "#323232", "#3b3b3b", "#747474"];
const btnMsgs = ["Another?","...Bad day?","If you say so...","One more?","Last one..."];
const endOfLineMsg = "Go out and touch some grass. Look at some birds. Take a walk in the park. Get some sun, but don't stare directly at it.";
const darkColor = "--darkColor";

//Load the API key from Environment Variables
const API_KEY = "aKzJRB1veIEjHT8Pjkq1Dw==L1JISNl84RVZXjbD";
const apiUrl = "https://api.api-ninjas.com/v1/quotes";
const headers = {'X-Api-Key': API_KEY};

function QuoteMachine(){
  const [count, setCount] = React.useState(0);
  const [quote, setQuote] = React.useState("Please wait a moment...");
  const [author, setAuthor] = React.useState("");
  const [btnMsg, setBtnMsg] = React.useState("Another quote?");
  const [isLoading, setLoad] = React.useState(false);
  const [isFirstCall, setFirstCall] = React.useState(true);
  const [show, setShow] = React.useState(true);

  const increment = () => { setCount(count+1)};

  const fetchData = async () => {

    try{  
        setLoad(true); 
        const response = await fetch(apiUrl, {method: 'GET', headers});
        const data = await response.json();
        setQuote(data[0].quote);
        setAuthor(data[0].author);

        if(!isFirstCall){
          document.body.style.setProperty(darkColor, clrArray[count]);
          document.body.style.setProperty(darkColor, clrArray[count]);
          setBtnMsg(btnMsgs[count]);
          increment(); 
        }

        setLoad(false);

    }catch(error){
        setQuote("An error occured. Please try again later");
        setAuthor("");
    }

  }

  //Fetch data from the API when page loads. Only runs once.
  useEffect(() => {
    fetchData();
    setFirstCall(false);
  }, []);

  const handleClick = () => {setTimeout(fetchData, 1000)};

  if(count < 6){
      return(
      
        <div id="quote-box" class="mount">
          <h1>Get Me Out of the <span className="place">Abyss</span></h1>
          <div id="text">{quote}</div>
          <div id="author">{author}</div> 
          <div className="btns">
            <a id="tweet-quote" href="twitter.com/intent/tweet">
              <img src={crow} alt="An angry looking crow"/>
            </a>
            <button disabled={isLoading} type="button" id="new-quote" onClick={handleClick}><span>{btnMsg}</span></button>
          </div>
          <p>Inspirational Quotes Provided By <a href="https://api-ninjas.com/" target="_blank">API Ninjas</a></p>
        </div>

      ); 

    }else{
      return(

        <div id="quote-box">
          <h1>Get Out of the House</h1>
            <div id="text">{endOfLineMsg}</div>
            <div className="btns">
              <a id="tweet-quote" href="twitter.com/intent/tweet">
                <img src={crow} alt="An angry looking crow"/>
              </a>
            </div>
          <p>Inspirational Quotes Provided By <a href="https://api-ninjas.com/" target="_blank">API Ninjas</a></p>
        </div>

      ); 
    }

}

export default QuoteMachine;
