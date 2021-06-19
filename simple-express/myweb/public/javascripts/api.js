/*async function getApi() {
    let response = await fetch('api/stocks');

  if (response.ok) {
    let json = await response.json();
    console.log(json)
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
getApi()*/

//const { compile } = require("pug");

//axios
async function getApi() {
    let templatehtml = $('#mytemplate').html();
    let compiler = _.template(templatehtml);
    let res = await axios.get('api/stocks');
    console.log(res.data);
    _.each(res.data, function(data) {
       // console.log(data);
        let str = compiler({
            "stock_id": data.stock_id,
            "stock_name": data.stock_name
        })
        console.log(str);
        $(str).appendTo('#app');
    })
}
getApi();


