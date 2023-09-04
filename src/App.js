import {Component} from 'react'
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      monsters: [
      ],
      //searchField gives access to the latest event value
      searchField: '',

    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json()).then((users)=>{
      return this.setState(
        ()=>{
          return {monsters:users}
        },
        ()=>{
          console.log(this.state)
        }
      )
    })
  }

  render(){

      //filteredMonsters is the new array that we get by comparing the latest event values with the names of monsters in the original "monsters" array

      const filteredMonsters = this.state.monsters.filter((monster)=>{
          return monster.name.toLocaleLowerCase().includes(this.state.searchField);
        });
    return (
    <div className="App">
      <input className='search-box' type='search' placeholder='search monsters' onChange={(event)=>{
        console.log(event.target.value);
        //searchString converts the event values to lowercase
        const searchString = event.target.value.toLocaleLowerCase()
        
        this.setState(()=>{
          //we update the searchField with latest event value with the help of searchField
          return {searchField:searchString};
        })
      }}/>
      
      {/* instead of mapping the priginal array, we map through the filteredMonsters array as it contains only the value that match with the latest event values. */}
      
      {filteredMonsters.map((monster)=>{
        return <div key={monster.id}><h1>{monster.name}</h1></div>
      })}
    </div>
  );    
  }
  
}

export default App;
