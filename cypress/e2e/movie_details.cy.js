import posters from '../fixtures/movie_posters.json' 
import details from '../fixtures/movie_details.json' 

describe('Movie Details', () => {
  beforeEach(() => {
    cy.intercept('GET', "https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies", { body: posters }).as('getMovies');
    cy.visit('http://localhost:3000/')
    let movie = posters[0]
    cy.intercept('GET', `https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/${movie.id}`, { body: details }).as('getSubscriptionDetails');
    cy.visit('http://localhost:3000/');
    cy.wait('@getMovies')
    cy.get('.movie-card').first().click()
    cy.get('@getSubscriptionDetails');
  })

  it('displays movie details of the movie being clicked', () => {
    cy.get('.image-container').within(() => {
      cy.get('img').should('have.attr','src', details.backdrop_path)
    })
    cy.get('h2').should('have.text', details.title);
    cy.get('.genre-button-container').within(() => {
      cy.get('.genre-button').should('have.length', details.genre_ids.length); 
      details.genre_ids.forEach((genre, index) => {
        cy.get('.genre-button').eq(index).should('contain', genre); 
      });
    })
    cy.get('p').should('have.text', details.overview)
  })

  it('has a home button that appears when inside the movie details and when clicked movie details goes away', () => {
    cy.get('.header').within(() => {
      cy.get('.home-button').should('exist')
      cy.get('.home-button').click()
      cy.get('.home-button').should('not.exist');
    })
    cy.get('.movies-container').should('exist');
    cy.get('.movies-container').find('.movie-card').should('have.length', posters.length);
  })
})