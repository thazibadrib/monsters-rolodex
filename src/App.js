import React, { useEffect, useState } from 'react'
import './App.css';
import CardList from './components/card-list/Card-list.component';
import SearchBox from './components/search-box/Search-box.component';

const App =()=>{

  const [searchField, setSearchField] = useState('');
  const[monsters, setMonsters] = useState([]);
  const[filteredMonsters, setFilteredMonsters] = useState(monsters);

   const onSearchChange = (event)=>{
        const searchString = event.target.value.toLocaleLowerCase()
        
        setSearchField(searchString)
      }

      useEffect(()=>{
        async function getMonsters(){
          await fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json()).then((users)=>{
                  return (setMonsters(users))
        })
      }

      getMonsters()
    }, [])

    //use another useEffect to optimize the rendering of monsters. so the render process only occurs when only the dependencies change.
      useEffect(()=>{
        const newFilteredMonsters = monsters.filter((monster)=>{
                  return monster.name.toLocaleLowerCase().includes(searchField);
                });

                setFilteredMonsters(newFilteredMonsters)
      },[monsters, searchField])
      

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      
      <SearchBox onChangeHandler={onSearchChange} className='monsters-search-box' placeholder='search monsters'/>

      <CardList monsters={filteredMonsters}/>
    </div>
  )
}

// class App extends Component {

//   constructor(){
//     super();
//     this.state={
//       monsters: [
//       ],
//       searchField: '',

//     }
//   }

//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users').then(response=>response.json()).then((users)=>{
//       return this.setState(
//         ()=>{
//           return {monsters:users}
//         },
//         ()=>{
//           console.log(this.state)
//         }
//       )
//     })
//   }

//  onSearchChange = (event)=>{
//         const searchString = event.target.value.toLocaleLowerCase()
        
//         this.setState(()=>{
//           return {searchField:searchString};
//         })
//       }


//   render(){

//       const {monsters, searchField} = this.state;
//       const {onSearchChange} = this;

//       const filteredMonsters = monsters.filter((monster)=>{
//           return monster.name.toLocaleLowerCase().includes(searchField);
//         });
//     return (
//     <div className="App">
//       <h1 className='app-title'>Monsters Rolodex</h1>
      
//       <SearchBox onChangeHandler={onSearchChange} className='monsters-search-box' placeholder='search monsters'/>

//       <CardList monsters={filteredMonsters}/>
//     </div>
//   );    
//   }
  
// }

export default App;
