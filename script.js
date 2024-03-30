

const getTabLink = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      resolve(tabs[0].url);
    });
  });
}



async function fetchData() {
  const link = await getTabLink();
  
  fetch("http://localhost:3000/transcript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: link
    })
  })
  .then(data => data.json())
  .then(transcript => {
    const text = transcript;
    const test  = document.getElementById("test");
    test.innerHTML = text;
  });
}

fetchData();



