import './IndividualSubscription.css';
import upVote from '../icons/upvote.png'
import downVote from '../icons/downvote.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Change voting to activate, cancel subscription
const IndividualSubscription = ({ posterPath , voteCount, posterId }) => {
  const [votes, setVotes] = useState(voteCount)
  
  function adjustVote(vertical){
    fetch(`https://localhost:3000/api/v1/subscriptions${posterId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote_direction: vertical })
    }) 

  }
  function incrementVote(){
    setVotes(votes + 1)
    adjustVote("up")
  }

  function decrementVote(){
    setVotes(votes - 1)
    adjustVote("down")
  }

  return (
    <div className="movie-card">
      <Link to={`/${posterId}`}>
      <img src={ posterPath } className="movie-poster" />
      </Link>
      <div className='vote-section'>
        <img src={ upVote } onClick={ incrementVote } />
        <p className='vote-count'>{votes}</p>
        <img src={ downVote } onClick={ decrementVote } />
      </div>
    </div>
  );
};
export default IndividualSubscription;