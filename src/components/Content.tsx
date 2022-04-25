import React, {useState, useRef} from 'react';
import {ToggleSwitch, Modal, ModalBody, ModalFooter, Button, Input, Alert, AlertContainer} from '@momentum-ui/react';
import Search from './Search';
import Fav from './Fav';

interface Props {
  webex: any
}
const Placeholder = () => <div className="placeholder" />;

const Content = ({webex}: Props): JSX.Element => {
  const [people, setPeople] = useState(JSON.parse(localStorage.getItem('people')) || []);
  const [displayFavs, setDisplayFavs] = useState(true);
  const [buttonContent, setButtonContent] = useState('Manage Contacts');

  const addPerson = (person) => {
    const newPeople = [...people, person];
    localStorage.setItem('people', JSON.stringify(newPeople));
    setPeople(newPeople);
  };

  const removePerson = (person) => {
    const folks = people.filter((peep) => peep !== person);
    localStorage.setItem('people', JSON.stringify(folks));
    setPeople([...folks]);
  }

  const favs = people.map((person) => 
    <Fav key={person.id} person={person} webex={webex} removePerson={removePerson}/>
  );

  const manageFavs = <Search 
    webex={webex}
    addPerson={addPerson}
    removePerson={removePerson}
    people={people}
  />;


  const placeholders = <>
    <div className='menu' />
    <div className='menu' />
    <div className='menu' />
    <div className='menu' />
    <div className='menu' />
    <div className='menu' />
    <div className='menu' />
  </>;


  const onClick = () => {
    setDisplayFavs(!displayFavs);
    setButtonContent(displayFavs ? 'View Contacts': 'Manage Contacts');
  };

  return <div className="content">
    <Button
      color = "blue"
      onClick={onClick}
      size="28"
      className="button">{buttonContent}</Button>
     {displayFavs && <h1 className="title">Favorite Contacts</h1>}
     {displayFavs ? favs.length === 0 ? placeholders : <div className="menus">{favs}</div> : manageFavs}  
  </div>;
};

export default Content;
