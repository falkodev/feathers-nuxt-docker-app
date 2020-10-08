describe('Upload users', function() {
  const email = 'test@app.com'
  const password = 'test'

  beforeEach(function() {
    cy.visit('/login')
    cy.get('input[type=email]').type(email)
    cy.get('input[type=password]').type(`${password}{enter}`)
    cy.wait(500) //eslint-disable-line cypress/no-unnecessary-waiting
    cy.visit('/upload-users')
  })

  it('disables the upload button at first', function() {
    cy.get('button').should('be.disabled')
    cy.get('.preview').should('be.empty')
    cy.url().should('include', '/upload-users')
  })
})
