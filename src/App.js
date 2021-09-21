import { useState } from 'react';
import contacts from './contacts.json'
import './App.css';



let contactsCopy = [...contacts].filter((contact, index) => { return index >4});

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

const stateContacts = [...contacts].filter((contact, index) => {return index <= 4} )
shuffle(contactsCopy);

function App() {
const [contactList, setContactList] = useState(stateContacts)

function getUniqueRandomContact() {
  if(!contactsCopy.length) return
  const newContact = contactsCopy.pop()
  setContactList(currentList => [...currentList, newContact])
}

function sortByName() {
setContactList(currentList => [...currentList.sort((a,b) => a.name.localeCompare(b.name))])
}

function sortByPopularity() {
  setContactList(currentList => [...currentList.sort((a,b) => b.popularity - a.popularity)])
}

function deleteContact(id) {
  const updatedArray = contactList.filter(contact => {return contact.id !== id})
  setContactList(updatedArray)
}

  return (
    <div className="App">
    <h1>IronContacts</h1>
    <div>
    <button onClick={() => getUniqueRandomContact()}>Add "Contact"</button>
    <button onClick={() => sortByPopularity()}>Sort by Popularity</button>
    <button onClick={() => sortByName()}>Sort by name</button>
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
              <td><button onClick={() => deleteContact(contact.id)}>Remove</button></td>
            </tr>
            </>
          )
        })}
      </table>
    </div>
  );
}

export default App;
