import './SubscriptionDetails.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SubscriptionDetails() {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${movieId}`)
      .then(response => response.json())
      .then(SubscriptionDetails => {
        setDetails(SubscriptionDetails);
      })
      .catch(error => {
        console.log('Error fetching movie details:', error);
      });
  }, [movieId]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='movie-details'>
        <div className='image-container'>
          <img src={details.backdrop_path} alt={details.title} />
        </div>
        <h2>{details.title}</h2>
        <div className="genre-button-container">
          {details.genre_ids.map((genre, index) => (
            <button key={index} className="genre-button">
              {genre}
            </button>
          ))}
        </div>

        <p>{ details.overview }</p>
      </div>
    </div>
  );
}

export default SubscriptionDetails;
