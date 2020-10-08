describe('Logging In', function() {
  const email = 'test@wap.com'
  const password = 'test'

  context('Home', function() {
    it('cannot access homepage if not logged in', function() {
      // cy.request('POST', 'http://localhost:8080/users', {
      //   email,
      //   password,
      //   firstName: 'firstName',
      //   lastName: 'lastName',
      // })
      cy.visit('/')
      cy.url().should('include', '/login')
    })
  })

  context('Login', function() {
    beforeEach(function() {
      cy.visit('/login')
    })
    it('displays errors on login', function() {
      // incorrect username on purpose
      cy.get('input[type=email]').type(email)
      cy.get('input[type=password]').type('password123{enter}')

      // we should have visible errors now
      cy.wait(500) //eslint-disable-line cypress/no-unnecessary-waiting
      cy.get('.v-snack__wrapper.error')
        .should('be.visible')
        .and('contain', 'Error')

      // and still be on the same URL
      cy.url().should('include', '/login')
    })

    it('can log in', function() {
      cy.visit('/login')
      cy.get('input[type=email]').type(email)
      cy.get('input[type=password]').type(`${password}{enter}`)

      cy.location().should(loc => expect(loc.pathname).to.eq('/'))
    })

    it('can access homepage after a successful login', function() {
      cy.visit('/')
      cy.get('input[type=email]').type(email)
      cy.get('input[type=password]').type(`${password}{enter}`)
      cy.location().should(loc => expect(loc.pathname).to.eq('/'))
    })
  })
})
