// store using ImmutableJS
let store = Immutable.Map({
  user: Immutable.Map({ name: 'cosmonaut' }),
  apod: '',
  selectedRover: "Curiosity",
  rovers: ['Curiosity', 'Opportunity', 'Spirit'],
  roverInfo: (''),
});


// adds our markup to the page
const root = document.getElementById("root");


// updates Immutable store object
const updateStore = (state, newState) => {
    const store = state.merge(newState);
    render(root, store);
  };

  const render = async (root, state) => {
    root.innerHTML = App(state);
  };
  
  //  Listens for load before Javascript loads
  window.addEventListener("load", () => {
    getRoverImage(store, store.get('rovers')[0]);
    getRoverInfo(store.get("selectedRover"));
    render(root, store);
  });
  

// Dashboard components

// const tabs = (store) => {
//       const tabBtns = () => store.get('selectedRover');
//       tabBtns().map((el ) =>
//         {  
//             return    `<button class='btn-tab' onClick='displayRoverInfo(${el.toLowerCase})'>${el.toLowerCase()}</button>
//         <button class='btn-tab' onClick='displayRoverInfo('Opportunity'})'>Opportunity</button>
//         <button class='btn-tab' onClick='displayRoverInfo('Spirit'})'>Spirit</button>
        
//         `;
    
//         }).join('');
        
//     };



const tabs = (store) => {

        return    `<button class='btn-tab' onClick='displayRoverInfo('Curiosity')'>Curiosity</button>
    <button class='btn-tab' onClick='displayRoverInfo('Opportunity')'>Opportunity</button>
    <button class='btn-tab' onClick='displayRoverInfo('Spirit')'>Spirit</button>
    
    `;

    };
 


// callbackFunc = (callback) => {
// callback()
// }


// const displayRoverInfo = (state) => {
//     const selectedRoverInfo = (roverName) => store.get('selectedRover');
//     const (roverinfo)

//     updateStore(state, {selectedRoverInfo});
//     // selectedRoverInfo.set()

//     const roverImages = (roverName) => store.get('rovers').filter(r => roverName === r.name);
//     roverImages.find(rover => rover === rover.name);
//     const rover = (roverName) => filterRovers.find(rover => roverName === rover.name);

//     if (rover) {
//         console.log
//     }
//     return filterRovers;
// };


// const roverShow = () => {
//     roverBtnRover.find(rover => rover === rover.name)
// updateStore(state, roverName)
// rovers.set
//     getRoverInfo, getRoverImage
// }



// function changeIndex(selectedRover)
// button for each rover- displays info in sidebar and main section onclick. displayRoverInfo renders sidebar

// const sidebar = (store, state) => {

//     const roverData = state.photo_manifest;
//     // const roverBar = roverData.map(info => 
//         (
//             `
//             <h2>${roverData.name}</h2>
//             <ul>
//             <li><span>Launch Date:</span> ${roverData.launch_date} </li>
//             <li><span>Landing Date:</span> ${roverData.landing_date} </li>
//             <li><span>Status:</span> ${roverData.status} </li>
//             <li><span>Date of last image taken:</span> ${roverData.max_date} </li>
//             </ul>`
//         )
//     // );
// };


const sidebar = (store) => {

    const roverData = store.get('selectedRover');
    // const roverBar = roverData.map(info => 
        return `
            <h2>${roverData.name}</h2>
            <ul>
            <li><span>Launch Date:</span> ${roverData.launch_date} </li>
            <li><span>Landing Date:</span> ${roverData.landing_date} </li>
            <li><span>Status:</span> ${roverData.status} </li>
            <li><span>Date of last image taken:</span> ${roverData.max_date} </li>
            </ul>`
        
    // );
};

            
const dashboard = (sidebar, tabs, imageGallery, selectedRoverImage) => {
    ` 
    <section>
  <aside class='sidebar green'>${sidebar}</aside>
  <article class='main-content'>
  <div class='tabs-container>
  <div class='btn-container>${tabs}</div>
  <div class='tabs-panel>
  <div class='rover-image'>${selectedRoverImage}</div>
  <div class='latest-photos'>${imageGallery}</div>
  </div>
  </div>
  </article>
  </section>
  `;
};


// const selectedRoverImage = () => {
//     const roverImage = () => store.get('selectedRover');
//     const roverImageArray = () => roverImage.latest_photos.slice(0, 5);
//     // roverImage.map(rover => rover.)
//     return `<div class='slider'>
//     <div class='slides'>
//       <div class='slide'><img src='${roverImageArray}>
      
//     </div></div></div>`;
   
// };

const imageGallery = (store) => {

    const roverImage = () => store.get('selectedRover');
    const roverImageArray = roverImage.latest_photos.slice(0, 5);
  
    return `<div class='slider'>
  <div class='slides'>
    <div class='slide'><img src='${roverImageArray}>
    
  </div></div></div>`;
 

};


// App higher order function
const App = (state, dashboard) => {

    // ${Greeting(store.get('user').get('name'))}
  const rovers = store.get("selectedRover");
//   const roverInfo = state.get("roverInfo");

    return `
<div>${Greeting(store.get('user').get('name'))}</div>
<div>${dashboard}</div>`;

//  return dashboard(sidebar, tabs, imageGallery);
    // store.get("rovers").map((info) => info.latest_photos).join(''));
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

// Pure function that renders conditional information
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Dear ${name}, welcome to the Mars dashboard!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}


// const showRover = (selectedRover) => {
//     if (selectedRover) {
//         return ``
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


// Rover api calls
const getRoverImage =  (store, rover) => {
    //   let { rovers } = store;
      const images = fetch(`http://localhost:3000/rovers/${rover}`)
        .then((res) => res.json())
        .then((rovers) => console.log(rovers))
        .then((rovers) => updateStore(store, { rovers }));
        // return roverData;
    };
 

const getRoverInfo =  ( chosenRover) => {
    const roverInfo = fetch(`http://localhost:3000/manifests/${chosenRover}`)
        .then((res) => res.json())
        .then((roverInfo) => console.log(roverInfo))
      
        .then((roverInfo) => updateStore(store, { roverInfo }));
    // return roverInfo;
  };



