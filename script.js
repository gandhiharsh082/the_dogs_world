  function search() {
    // Get the search input text in the search_value variable
    var search_value = document.getElementById("search").value;
    let length = search_value.length;
    // console.log(search_value);

    if (length >= 3) {
        // Call the display function if the search value length is 3 or more
        display(search_value);
    } else if (length < 3) {
        // Clear the data display if the search value length is less than 3
        document.getElementById("dataDisplay").innerHTML = "";
    }
}

async function display(search_value) {
    // Call the API and await the response
    data = await callAPI(search_value)
    html = "";

    if (data.length > 0) {
        for (item in data) {
            if (data[item].reference_image_id) {
                imgurl = `https://cdn2.thedogapi.com/images/${data[item].reference_image_id}.jpg`;
                html += `<div class="col-md-4 mt-2">
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
    } else {
        // Display "not found" message if no data is returned
        html += "<h5>not found</h5>";
    }

    // Update the data display with the generated HTML
    document.getElementById("dataDisplay").innerHTML = html;
}

async function callAPI(text) {
    // Call the API and return the response
    let api = await fetch("https://api.thedogapi.com/v1/breeds/search?q=" + text);
    let response = await api.json();
    return response;
}
