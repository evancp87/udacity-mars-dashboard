let store = Immutable.Map({
  // user: Immutable.Map({ name: 'Student' }),
  // apod: '',
  selectedRover: "Curiosity",
  rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"]),
  roverInfo: Immutable.Map({}),
});



// add our markup to the page
const root = document.getElementById("root");

const updateStore = (state, newState) => {
  const store = state.merge(newState);
  render(root, store);
};

// Dashboard components
const tabs = (store) => {
  store
    .get("rovers")
    .map(
      (roverName) =>
        `<button class='btn-tab' onClick='displayRoverInfo('${roverName}')'>${roverName}</button>`
    );
};


const sidebar =  (info) =>
(
    `
          <h2>${info.name}</h2>
          <ul>
          <li><span>Launch Date:</span> ${info.launch_date} </li>
          <li><span>Landing Date:</span> ${info.landing_date} </li>
          <li><span>Status:</span> ${info.status} </li>
          <li><span>Date of last image taken:</span> ${info.max_date} </li>
          </ul>`
)

const displayRoverInfo = (store) => {
     const roverPanel = sidebar.get(roverInfo);
};

const dashboard = (sidebar, tabs, imageGallery) => {
    ` 
    <section>
  <aside class='sidebar green'>${sidebar}</aside>
  <article class='main-content'>
  <div class='tabs-container>
  <div class='btn-container>${tabs}</div>
  <div class='tabs-panel>
  ${imageGallery}
  </div>
  </div>
  </article>
  </section>
  `;
};


const imageGallery = (store) => {
  const imageGallery = store.get("rovers").map((info) => info.latest_photos).join('');


};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

const App = (state) => {
  const rovers = state.get("rovers");
  const roverInfo = state.get("roverInfo");

  if (rovers) {
    return store.get("rovers");
  }

  return dashboard(sidebar, tabs, imageGallery);
};

// listening for load event because page should load before any JS is called

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

// const roverSelection = (rover) => {
//     rover !== 'curiosity' ?  rover : 'Curiosity'
// };

// Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }

// ------------------------------------------------------  API CALLS

// Example API call

// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     fetch(`http://localhost:3000/apod`)
//     .then(res => res.json())
//     .then(apod => updateStore(store, { apod }))

//     return data
// }

// const roverInfo = (store, selectedRover) => {
//     if (selectedRover !== 'curiosity') {
//         updateStore(store, { selectedRover})
//     } return {
//         selectedRover === 'Curiosity'
//     }
// }

// const selectedRoverImg = (store) => {
//     const selectedRoverImg = (store).store.get('rovers').map(photo => (`<img src'=${img_src}'>`)
//     )}

const roverImage = (state, rover) => {
  let { rovers } = state;
  fetch(`http://localhost:3000/${rover}`)
    .then((res) => res.json())
    .then((rovers) => updateStore(store, { rovers }));
  return rovers;
};

const getRoverInfo = (state, chosenRover) => {
  let { roverInfo } = state;

  fetch(`http://localhost:3000/${chosenRover}`)
    .then((res) => res.json())
    .then((roverInfo) => updateStore(store, { roverInfo }));
  return roverInfo;
};

window.addEventListener("load", () => {
  getRoverInfo(store.get("roverInfo"));
  roverImage(store.get("rovers"));
  render(root, store);
});
