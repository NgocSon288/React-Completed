const { createStore } = window.Redux

// Constaints
const TYPE = {
   ADD: 'ADD'
}

// Initial state
const initState = [
   {
      id: 1,
      name: 'Watch movie'
   },
   {
      id: 2,
      name: 'Play game'
   }
]

// Create reducer
const hobbyReducer = (state = initState, action) => {
   const { type, hobbyName } = action
   switch (type) {
      case TYPE.ADD:
         return [...state, {
            id: state.length + 1,
            name: hobbyName
         }]

      default:
         return [...state]
   }
}

// Create store
const store = createStore(hobbyReducer)



// Render by state
const reloadState = () => {
   const data = store.getState()

   renderHobbyList(data)
}

// Register state change
store.subscribe(() => {
   reloadState()
})


// ------------------ DOM ------------------------
// Dom render
const renderHobbyList = (hobbies) => {
   const ulEle = document.querySelector('#ul-hobby')
   ulEle.innerHTML = ''

   for (const item of hobbies) {
      const liEle = document.createElement('li')

      liEle.textContent = item.name
      ulEle.appendChild(liEle)
   }
}

// Dom button add
document.querySelector('#btn-add').addEventListener('click', () => {
   const inputEle = document.querySelector('#hobby-name');
   store.dispatch({
      type: TYPE.ADD,
      hobbyName: inputEle.value
   })

   inputEle.value = ''
})

// -------------- Window ---------------
window.onload = () => {
   reloadState()
}