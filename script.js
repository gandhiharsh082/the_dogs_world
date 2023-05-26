 function search(){
    // get search input text in search value variable
    var search_value = document.getElementById("search").value;
    let length = search_value.length;
    // console.log(search_value);
    if(length>=3){
      display(search_value);
    }else if(length<3){
      document.getElementById("dataDisplay").innerHTML = "";
    }
}
async function display(search_value) {
    data = await callAPI(search_value)
    html="";
    if(data.length>0){
        for(item in data){
            if(data[item].reference_image_id){
                imgurl =`https://cdn2.thedogapi.com/images/${data[item].reference_image_id}.jpg`;
                html+=`<div class="col-md-4 mt-2">
                <div class="card" style="width: 18rem;">
                 <img class="card-img-top" src="${imgurl}" width="286" height="180">
                  <div class="card-body">
                    <h5 class="card-title">${data[item].name}</h5>
                    <p class="card-text">
                    <b>life_span : </b> ${data[item].life_span}<br>
                    <b>temperament : </b> ${data[item].temperament??"not available"}<br>       
                    </p>
                  </div>
                </div>
              </div>`;
            }
       }
    }else{
        html+="<h5>not found</h5>";
    }
   document.getElementById("dataDisplay").innerHTML = html;
}
async function callAPI(text) {
    let api = await fetch("https://api.thedogapi.com/v1/breeds/search?q="+text);
    let response = await api.json();
    return response;
  }


