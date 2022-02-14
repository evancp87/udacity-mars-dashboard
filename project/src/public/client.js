// store using ImmutableJS
let store = Immutable.Map({
  apod: "",
  selectedRover: "Curiosity",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  roverData: {},
});

// adds our markup to the page
const root = document.getElementById("root");

// updates Immutable store object
const updateStore = (state, newState) => {
  store = state.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state, sidebar, tabs, roverImageGallery);

  //   root.innerHTML = dashboard(state);
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  getRoverImage(store, store.get("rovers")[0]);

  getRoverInfo(store.get("selectedRover"));
  // getRoverInfo(store.get('roverData'));
  render(root, store);
});

// ========================================================================================================================================

// Dashboard components

const tabs = () => {
  const tabBtns = () => store.get("rovers");
  return tabBtns()
    .map((el) => {
      return `<button class='btn-tab' id='${el}' onClick='displayRoverInfo(${el})'>${el}</button>`;
    })
    .join("");
};


// button for each rover- displays info in sidebar and main section onclick. displayRoverInfo renders sidebar

const sidebar = (state) => {
  const roverData = store.get("roverData");
  const selectedRover = store.get("selectedRover");
  console.log(roverData);

  if (roverData.hasOwnProperty("rover")) {
    return `
  <h2 class='rover-name'>${roverData.rover.get("name")}</h2>
  <div><img src='/assets/images/${
    roverData.rover.get("name") + ".jpg"
  }' alt='rover image' class='main-rover-img'>
  <ul class='rover-info'>
  <li class='roverinfo-item'><span>Landing Date:</span> ${roverData.rover.get(
    "landing_date"
  )} </li>
  <li class='roverinfo-item'><span>Launch Date:</span> ${roverData.rover.get(
    "launch_date"
  )} </li>
  <li class='roverinfo-item'><span>Status:</span> ${roverData.rover.get(
    "status"
  )} </li>
  <li class='roverinfo-item'><span>Date of last image taken:</span> ${roverData.rover.get(
    "max_date"
  )} </li>
  ${roverFact(roverData.rover.get('name'))}

  </ul>`;
    // );
  } 
  return `<p class='loading-rovers'>Loading Data</p>`
};



const displayRoverInfo = (el, e) => {
  // let roverData = store.get("roverData");

   let selectedRover = store.get("selectedRover");
  // let button = button.id;
  // const sidebar = sidebar();
  // const imageGallery = store.get('image');


  if (el.id === "Curiosity") {
    updateStore(store, { selectedRover: "Curiosity" });
    console.log(store);
    //   getRoverInfo(store.get("selectedRover"));
  } else if (el.id === "Spirit") {
    updateStore(store, { selectedRover: "Spirit" });
    console.log(store);

    //   getRoverInfo(store.get("selectedRover"));
  } else if (el.id === "Opportunity") {
    updateStore(store, { selectedRover: "Opportunity" });
    console.log(store);

    return selectedRover;
    //   getRoverInfo(store.get("selectedRover"));
  }

  // const roverImages = (roverName) => store.get('rovers').filter(r => roverName === r.name);
  // roverImages.find(rover => rover === rover.name);
  // const rover = (roverName) => filterRovers.find(rover => roverName === rover.name);

  // if (rover) {
  //     console.log
  // }
  // return filterRovers;
};

const roverFact = (roverData) => {
  if (roverData == "Curiosity") {
    return `<p class='rover-fact'>Curiositys mission is to determine whether the Red Planet ever was habitable to microbial life. The rover, which is about the size of a MINI Cooper, is equipped with 17 cameras and a robotic arm containing a suite of specialized laboratory-like tools and instruments. </p>`;
  }  else if (roverData == "Opportunity") {
    return `<p class='rover-fact'> Opportunity was the second of the two rovers launched in 2003 to land on Mars and begin traversing the Red Planet in search of signs of ancient water. The rover explored the Martian terrain for almost 15 years, far outlasting her planned 90-day mission.</p>`;
  } 
  else if (roverData == "Spirit") {
    return `<p class='rover-fact'>Spirit is just north of a low plateau called "Home Plate." It spent 2008 on a north-facing slope on the edge of Home Plate so that its solar panels stayed tilted toward the winter sun for maximum electrical output.</p>`;
  }
};

const renderRoverImages = (state) => {
  // const roverImageArray = store.get('roverData');
  // // const roverImageArray = roverImage.latest_photos.slice(0, 5);
  // // return roverImageArray.map(r => {
  // if (roverImageArray.hasOwnProperty('img_src')) {
  //   return ` <div class='scroll-item'> <img src='${src}' alt=''></div>`;

  // } return `<p>Loading Images</p>`



  const imageGallery = store.get("roverData");
    console.log(imageGallery);
  if (imageGallery.hasOwnProperty("img_src")) {    
  imageGallery.map(img_src => { return roverImageGallery(img_src.get("img_src")).slice(0, 5);}
  )} return `<p class='loading-images'>Loading Images</p>`


  
  // }
  // return store
  //   .get("roverData").slice(0, 5)
  //   .map(
  //     (img_src) => roverImageGallery(img_src.get("img_src"))
  //     // }).join('');
  //   );
};

const roverImageGallery = (src) =>
  ` <div class='scroll-item'> <img src='${src}' alt='One of the rover latest images'></div>`;

// App higher order function
const App = (state) => {
  const apod = state.get("apod");
  const selectedRover = state.get("selectedRover");
  const roverData = state.get("roverData");
  const rovers = state.get("rovers");
  return `
  
  <header class="hero" >
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
        <button class='scroll-down'><span class='crater1'></span><span class='crater2'></span><span class='crater3'></span></button>
         </header>
         <main>
  <section>
      <div class="mars-intro">
          <h1 class="title">
              Mars Rover
          </h1>
         
          <p class="intro-text">
          Since the 1960s, humans have set out to discover what Mars can teach us about how planets grow and evolve, and whether it has ever hosted alien life. Mars has captivated humans since we first set eyes on it as a star-like object in the night sky. Early on, its reddish hue set the planet apart from its shimmering siblings, each compelling in its own way, but none other tracing a ruddy arc through Earth’s heavens. Then, in the late 1800s, telescopes first revealed a surface full of intriguing features—patterns and landforms that scientists at first wrongly ascribed to a bustling Martian civilization. Now, we know there are no artificial constructions on Mars. But we’ve also learned that, until 3.5 billion years ago, the dry, toxic planet we see today might have once been as habitable as Earth.
          Mars exploration at NASA "follows the water." Earlier missions had found that liquid water existed on Mars in the distant past.</br></br> The Curiosity rover explored the “habitability” of Mars. It found nutrients and energy sources that microbes could have used, and established that Mars indeed had regions that could have been friendly to life in the ancient past. Did life take hold on the Red Planet? Future rovers will take the next step by looking for the signs of past life itself.
          </p>


      </div>
  </section>
<section class='rover-section'>
<div class='tabs-container'>
<div class='btn-container'>${tabs(state)}</div>
<div class='flex-container'>
<aside class='sidebar blue'>${sidebar(roverFact, state)}</aside>
<article class='main-content red'>
<div class='tabs-panel'>
<div><h3>Latest Photos</h3></div>
<div class='scroller'>
${roverImageGallery(roverData, state)}
</div>
</div>
</div>
</div>
</article>
<div id='photo' class='imgOfDayWrapper' >${ImageOfTheDay(apod, state)}</div>
</section>
</main>
<footer>
        <div class="copyright">Made on 🌎 in 2022 by Evan Parker 🚀🪐</div>
        <div class="info">All images and information from the Nasa Api. <a
            href="https://api.nasa.gov/">More information</a></div>
    </footer>
`;
};



// =======================================================================================================================================================

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(apod.date);
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the photo of the day is actually type video!
  if (apod.media_type === "video") {
    return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p class=''>${apod.title}</p>
            <p class=''>${apod.explanation}</p>
        `;
  } else if (apod.hasOwnProperty("image")) {
    return `
            <img class='imgOfDay' src="${apod.image.url}" height="350px" width="100%" />
            <p class='imgOfDayTxt'>${apod.image.explanation}</p>
        `;
  } return `<p class='loading-apod'>Loading Picture of the Day</p>`
};

// =================================================================================================================================================

// Pure function that renders conditional information

// const showRover = (selectedRover) => {
//     if (selectedRover) {
//         return ``
//     }
// }

// ------------------------------------------------------  API CALLS

// Example API call

const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));

};

// function to process rover information
// const displayRover = (store, selectedRover) => {
//     if (selectedRover === 'curiosity') {
//        return rover(store.get('rovers')[0])
//     } else if  (selectedRover === 'opportunity')
// return {
//     selectedRover(store.get('rovers')[1]);
// } else if (selectedRover === 'Spirit') {
//     return selectedRover(store.get('rovers')[2]);
// } else {}

// function to process rover image array
// const roverImages
// =================================================================================================================================================

// =============================================================================================================================================================================================
// Rover api calls
const getRoverImage = (store, rover) => {
  //   let { rovers } = store;
  const images = fetch(`http://localhost:3000/rovers/${rover}`)
    .then((res) => res.json())
    .then((rovers) => {
      console.log(rovers);
      let roverData = rovers.image.latest_photos;
      updateStore(store, { roverData: roverData });
      console.log(store);
    });
  // console.log(store);
  // return roverData;
};

const getRoverInfo = (chosenRover) => {
  const roverInfo = fetch(`http://localhost:3000/manifests/${chosenRover}`)
    .then((res) => res.json())

    .then((rover) => {
      const roverData = rover.data.photo_manifest;
      const { landing_date, launch_date, max_date, max_sol, name, status } =
        roverData;
      console.log(roverData);
      updateStore(store, {
        roverData: {
          rover: Immutable.Map({
            landing_date,
            launch_date,
            max_date,
            max_sol,
            name,
            status,
          }),
        },
      });
      console.log(store);
    });
};

// ================================================================================================================================
