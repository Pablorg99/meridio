/* eslint-disable @typescript-eslint/no-namespace,@typescript-eslint/no-non-null-assertion */
import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Promise<string>;

      dbClean(): Promise<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit(`/`);

  const cookieName = Cypress.env('COOKIE_NAME');

  cy.task('GitHubSocialLogin', {
    username: Cypress.env('GITHUB_USERNAME'),
    password: Cypress.env('GITHUB_PASSWORD'),
    loginUrl: `${Cypress.env('BASE_URL')}/api/auth/signin`,
    headless: true,
    logs: true,
    isPopup: true,
    loginSelector: 'button[type="submit"]',
    postLoginSelector: 'button[data-testid="logout"]',
  }).then(({ cookies }) => {
    cy.clearCookies().then(() => {
      const cookie = cookies.filter((cookie) => cookie.name === cookieName).pop();
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure,
        }).then(() => {
          Cypress.Cookies.defaults({
            preserve: cookieName,
          });

          return cookie.value;
        });
      }
    });
  });
});

Cypress.Commands.add('dbClean', () => {
  cy.task('dropDatabases');
});
