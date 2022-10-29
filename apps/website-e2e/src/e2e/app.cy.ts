import { getGreeting } from '../support/app.po';

describe('website', () => {
  beforeEach(() =>
    cy.visit('/', {
      headers: { 'Accept-Encoding': 'gzip, deflate' },
      timeout: 60000 * 5,
    })
  );

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Isomera');
  });
});
