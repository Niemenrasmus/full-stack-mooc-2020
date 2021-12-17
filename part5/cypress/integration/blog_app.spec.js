describe('Blog app', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.createUser()
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Login')
        cy.contains('username')
        cy.contains('password')
    })
    
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('testi123')
        cy.get('#password').type('qwerty')
        cy.contains('login').click()

        cy.get('.notification').contains('testi123 logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('testi987')
        cy.get('#password').type('abcd')
        cy.contains('login').click()
  
        cy.get('.notification').contains('wrong credentials')
      })

    describe('When logged in', function() {
        beforeEach(function() {
          // cy.login({username: "testi123", password: "qwerty"})
          cy.get('#username').type('testi123')
          cy.get('#password').type('qwerty')
          cy.contains('login').click()
        })
    
        it('A blog can be created', function() {
          cy.contains('Add Blog').click()
          cy.get('#title').type("testi")
          cy.get('#author').type("blogi")
          cy.get('#url').type('abc.ef')
          cy.contains('add blog').click()
    
          cy.get('.notification').contains(`New blog: testi blogi created`)
          cy.contains(`testi blogi`)
        })

        it('A blog can be liked', function () {
          cy.contains('Add Blog').click()
          cy.get('#title').type("testi")
          cy.get('#author').type("blogi")
          cy.get('#url').type('abc.ef')
          cy.contains('add blog').click()

          cy.contains('0').click()
          cy.contains('Like').click()
          cy.contains('1').click()
          cy.contains('Like').click()
          cy.contains('2').click()
        })

        it('A blog can be deleted', function () {
          cy.contains('Add Blog').click()
          cy.get('#title').type("testi")
          cy.get('#author').type("blogi")
          cy.get('#url').type('abc.ef')
          cy.contains('add blog').click()

          cy.get('.notification').contains(`New blog: testi blogi created`)
          cy.contains(`testi blogi`)
          
          cy.contains('Delete').click()
          cy.contains(`testi blogi`).should('not.exist')
        })
      })
    })
})