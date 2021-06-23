
//import './App.css';

//import { render } from "react-dom";
// import React from "react";

// class App extends React.Component {
//   constructor(props){
//     super(props);

//     this.State = {
//       newItem: "",
//       list: []
//     }
//   }
//     updateInput(key, value){
//       this.setState({
//         [key]: value
//       })
//     }
//     addItem(){
//       const newItem={
//         id: 1 + Math.random(),
//         value: this.State.newItem.slice()
//     };
//       const list = [...this.State.list];
//       list.push(newItem);
//       this.setState({
//       list,
//       newItem:""  
//     })
//   }
//   deleteItem(id) {
//     const list = [...this.state.list];
//     const updatedlist = list.filter(item => item.id !== id);
//     this.setState({ list: updatedlist });
//   }
// render() {
//   return (
//     <div className="App">
//       <div>
//         Add an item
//         <input
//           type="text"
//           placeholder="Type item"
//           value={this.State.newItem}
//           onChange={e => this.UpdateInput("newItem", e.target.value)}
//         />
//         <button
//           onClick={() => this.addItem()}>
//           Add
//         </button>
//         <br/>
//         <ul>
//           {this.state.list.map(item => {
//             return (
//               <li key={item.id}>
//                 {item.value}
//                 <button
//                   onClick={() => this.deleteItem(item.id)}
//                 >
//                  x 
//                 </button>
//               </li>
//               )})}
//         </ul>
//       </div>
//     </div>
//    );
//  }
// }      
// export default App;
import React from "react";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      newItem:"",
      list: []
    }
  }


    //incorporating local storage 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }





  updateInput(key, value){
    //update react state
    this.setState({
      [key]: value
    });
  }

  addItem(){
    //create item with unique id
    const newItem={
      id:1+Math.random(),
      value: this.state.newItem.slice()

    };
    //copy of current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItem:""
    });

  }
  
  deleteItem(id){
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id)

    this.setState({list:updatedList});
    }

  render() {
  return (
    <div className="App">

        <h1 className="app-title">TODO LIST</h1>
     
     <div className="container">
     <div style={{
            padding: 30,
            textAlign: "left",
            maxWidth: 500,
            margin: "auto"
          }}>



       Add an Item....
       <br/>
       <input
       type="text"
       placeholder="Type item here" 
       value={this.state.newItem}
       onChange={e=>this.updateInput("newItem", e.target.value)}
       />
       <button
        className="add-btn btn-floating"
         onClick={()=>this.addItem()}>
           <i class="material-icons">+</i>
       </button>
       <br/> <br/>
       <ul>
         {this.state.list.map(item => {
           return(
             <li key={item.id}>
               {item.value}
               <button className="btn btn-floating"
               onClick={()=>this.deleteItem(item.id)}>
                 <i class="material-icons">x</i>
                 </button>
             </li>
           )
         })}
       </ul>
       </div>
     </div>
    </div>
  );
}
}
// ReactDOM.render(<App />,document.getElementById('root'));

export default App;
