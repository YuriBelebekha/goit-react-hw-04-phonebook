import { useState, useEffect } from 'react';
import shortid from 'shortid';
import Section from './Section';
import ContactsList from './ContactsList';
import ContactForm from './ContactForm';
import Filter from './Filter';

const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

export default function App() {
  const [contacts, setContacts] = useState(parsedContacts);
  const [filter, setFilter] = useState('');  
  
  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    }

    const checkDuplicateContact = contacts.some(addContact =>
      (addContact.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase())
    );

    checkDuplicateContact
      ? alert(`${name.toUpperCase()} is already in contacts`)
      : setContacts(prevContact => [contact, ...prevContact]);
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = (contactId) => {
    setContacts(prevState => 
      prevState.filter(contact => contact.id !== contactId),
    )
  };

  const getFilteredContacts = () => {        
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };  
        
  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter
          filter={filter}
          onChange={changeFilter}
        />

        <ContactsList
          contacts={getFilteredContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );  
}