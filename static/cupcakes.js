const BASE_URL = "http://127.0.0.1:5000/api/cupcakes";

// generate each cupcake's html
function cupcakeHTML(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id} class="col-5 mx-2">
    <img class="image" src="${cupcake.image}" alt="no image">
    <li class="text-center">
    ${cupcake.flavor} || ${cupcake.size} || ${cupcake.rating} 
    <button class="delete-btn btn btn-danger btn-sm mx-4">X</button>
    </li>
    <hr class="my-4">
    </div>
    `;
}

// display cupcakes on page that are already in db
async function displayCupcakes() {
  const response = await axios.get(`${BASE_URL}`);
  for (let cupcake of response.data.cupcakes) {
    let addCupcake = $(cupcakeHTML(cupcake));
    $("#cupcakes-list").append(addCupcake);
  }
}

//handle new cupcake form submission
$("#cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const newCupcakeResp = await axios.post(`${BASE_URL}`, {
    flavor,
    rating,
    size,
    image,
  });

  const newCupcake = cupcakeHTML(newCupcakeResp.data.cupcake);
  $("#cupcakes-list").append(newCupcake);
  $("#cupcake-form").trigger("reset");
});

// handles deleting a cupcake
$("#cupcakes-list").on("click", ".delete-btn", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/${cupcakeId}`);
  $cupcake.remove();
});
displayCupcakes();
