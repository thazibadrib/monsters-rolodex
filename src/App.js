import {Component} from 'react'
import './App.css';
import CardList from './components/card-list/Card-list.component';
import SearchBox from './components/search-box/Search-box.component';

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

 onSearchChange = (event)=>{
        //searchString converts the event values to lowercase
        const searchString = event.target.value.toLocaleLowerCase()
        
        this.setState(()=>{
          //we update the searchField with latest event value with the help of searchField
          return {searchField:searchString};
        })
      }


  render(){

      const {monsters, searchField} = this.state;
      const {onSearchChange} = this;

      //filteredMonsters is the new array that we get by comparing the latest event values with the names of monsters in the original "monsters" array

      const filteredMonsters = monsters.filter((monster)=>{
          return monster.name.toLocaleLowerCase().includes(searchField);
        });
    return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      {/* <input className='search-box' type='search' placeholder='search monsters' onChange={onSearchChange}/> */}
      
      <SearchBox onChangeHandler={onSearchChange} className='monsters-search-box' placeholder='search monsters'/>

      {/* instead of mapping the priginal array, we map through the filteredMonsters array as it contains only the value that match with the latest event values. */}

      {/* {filteredMonsters.map((monster)=>{
        return <div key={monster.id}><h1>{monster.name}</h1></div>
      })} */}
      <CardList monsters={filteredMonsters}/>
    </div>
  );    
  }
  
}

export default App;
