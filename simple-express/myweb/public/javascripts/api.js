async function getApi() {
    let response = await fetch('api/stocks');

  if (response.ok) {
    let json = await response.json();
    console.log(json)
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
getApi()
