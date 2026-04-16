describe('Gallery', () => {
  it('opens search popup', () => {
    cy.visit('/');

    cy.contains('Add').click();

    cy.get('.modal-overlay').should('be.visible');
  });
});

describe('Search images', () => {
  it('search and display images', () => {
    cy.intercept('GET', '**/search/photos**', {
      body: {
        results: [
          {
            id: '1',
            urls: { small: 'img1.jpg' },
          },
        ],
      },
    });

    cy.visit('/');
    cy.contains('Add').click();

    cy.get('input').type('office');

    cy.get('.image-item').should('have.length', 1);
  });
});

it('adds image to gallery', () => {
  cy.intercept('GET', '**/search/photos**', {
    body: {
      results: [
        {
          id: '1',
          urls: { small: 'img1.jpg' },
        },
      ],
    },
  });

  cy.visit('/');
  cy.contains('Add').click();

  cy.get('input').type('office');

  cy.get('.overlay').click();

  cy.get('.image-wrapper').should('exist');
});

it('marks already added image as selected', () => {
  cy.intercept('GET', '**/search/photos**', {
    body: {
      results: [
        {
          id: '1',
          urls: { small: 'img1.jpg' },
        },
      ],
    },
  });

  cy.visit('/');

  cy.contains('Add').click();
  cy.get('input').type('office');
  cy.get('.overlay').click();

  cy.contains('Add').click();

  cy.get('.image-item')
    .should('have.class', 'selected');

  cy.contains('Added').should('exist');
});

it('closes popup', () => {
  cy.visit('/');

  cy.contains('Add').click();

  cy.get('.close-icon-popup').click();

  cy.get('.modal-overlay').should('not.exist');
});
