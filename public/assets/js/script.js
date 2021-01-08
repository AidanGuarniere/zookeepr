const $zookeeperForm = document.querySelector('#zookeeper-form');
const $animalForm = document.querySelector("#animal-form");

const handleAnimalFormSubmit = (event) => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = "";
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"')
    .selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  fetch("/api/animals", {
    // post data
    method: "POST",
    // use json data
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // stringify json animal object
    body: JSON.stringify(animalObject),
  })
    // if response to post is ok, return
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // else, error
      alert("Error: " + response.statusText);
    })
    // alert user their animal post was successful 
    .then((postResponse) => {
      console.log(postResponse);
      alert("Thank you for adding an animal!");
    });
};
$animalForm.addEventListener("submit", handleAnimalFormSubmit);


const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  // get zookeeper data and organize it
  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

  const zookeeperObj = { name, age, favoriteAnimal };
  console.log(zookeeperObj);
  fetch('api/zookeepers', {
    // post data 
    method: 'POST',
    // use json data
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // stringify json zookeeper object
    body: JSON.stringify(zookeeperObj)
  })
    // if response to post is ok, return 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // if response fails, error + status text
      alert('Error: ' + response.statusText);
    })
    // alert user their zookeeper post was successful
    .then(postResponse => {
      console.log(postResponse);
      alert('Thank you for adding a zookeeper!');
    });
};
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);
