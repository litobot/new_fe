import './App.css';
// This becomes SubscriptionList
import SubscriptionList from '../SubscriptionList/SubscriptionList'; 
// This becomes SubscriptionDetails
import SubscriptionDetails from '../SubscriptionDetails/SubscriptionDetails';
// Can make this a teacup icon or something fun
import homeButton from '../icons/home.png';
import search from '../icons/search.png';
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllSubscriptions = () => {
    fetch("https://localhost:3000/api/v1/subscriptions")
      .then(response => response.json())
      .then(subscriptionData => {
        setSubscriptions([...subscriptionData]);
        setSearchResults(subscriptionData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllSubscriptions();
  }, []);
  
  // Let's get rid of this lowercase thing
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Maybe I can even add a filter by subscription type/cost/etc. time permitting
    const filteredSubscriptions = subscriptions.filter((subscription) => 
      subscription.title.toLowerCase().includes(query)
    );
    setSearchResults(filteredSubscriptions);
  }

  return (
    <div>
      <div className='header'>
        <h1>Mrs. Nesbitt's Tea Time</h1>
        <Routes>
          <Route 
            path='/:movieId' 
            element={
              <Link to={'/'}>
                <img 
                src={homeButton} 
                className='home-button' 
                alt='Home'
              />
              </Link>
            } 
          />
        </Routes>
        <Routes>
          <Route
            path="/"
            element={
              <div className='search-container'>
                <img src={search} alt="search-icon" />
                <input
                  type='text'
                  placeholder='Search Subscriptions...'
                  className='search-bar'
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            }
          />
        </Routes>
      </div>
      <Routes>
        <Route path='/' element={<SubscriptionList subscriptions={searchResults} />} />
        <Route path='/:subscriptionId' element={<SubscriptionDetails />} />
      </Routes>
    </div>
  );
}

export default App;
