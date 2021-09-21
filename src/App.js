import { useState } from 'react';
import contacts from './contacts.json'
import './App.css';


let contactsCopy = [...contacts];
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

shuffle(contactsCopy);

function App() {
  console.log('line 22', contactsCopy)
const [contactList, setContactList] = useState(contacts.slice(0,5))
function getUniqueRandomContact() {
  if(contactsCopy.length === 0) return
  setContactList(currentList => [...currentList, contactsCopy.pop()])
}

function sortByName() {
setContactList(currentList => [...currentList.sort((a,b) => a.name.localeCompare(b.name))])
}

function sortByPopularity() {
  setContactList(currentList => [...currentList.sort((a,b) => b.popularity - a.popularity)])
}

  return (
    <div className="App">
    <h1>IronContacts</h1>
    <div>
    <button onClick={getUniqueRandomContact}>Add "Contact"</button>
    <button onClick={sortByPopularity}>Sort by Popularity</button>
    <button onClick={sortByName}>Sort by name</button>
    </div>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
        {contactList.map(contact => {
          return (
            <>
            <tr>
            <td><img src={contact.pictureUrl} alt="" /></td>
              <td>{contact.name}</td>
              <td>{Math.round(contact.popularity * 100) / 100}</td>
              <td>{contact.wonOscar ? 'Yes': ''}</td>
              <td>{contact.wonEmmy ? 'Yes': ''}</td>
            </tr>
            </>
          )
        })}
      </table>
    </div>
  );
}

export default App;
