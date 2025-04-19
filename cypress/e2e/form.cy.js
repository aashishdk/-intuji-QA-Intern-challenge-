import 'cypress-file-upload';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})

describe('Assesment QA Practice Form', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form')

    // Hide sticky elements
    cy.get('footer').invoke('attr', 'style', 'display: none')
    cy.get('#fixedban').invoke('attr', 'style', 'display: none')

    cy.get('#firstName').should('be.visible')
  })

  it('submits form with DOB selected via calendar', () => {
    cy.get('#firstName').type('Aashish')
    cy.get('#lastName').type('Dhakal')

    cy.get('#userEmail').type('aashish@example.com')

    cy.get('input[name="gender"][value="Male"]').check({ force: true })

    cy.get('#userNumber').type('9840760417')

    cy.get('#dateOfBirthInput').click()
    cy.get('.react-datepicker__month-select').select('April')  
    cy.get('.react-datepicker__year-select').select('2002')
    cy.get('.react-datepicker__day--001:not(.react-datepicker__day--outside-month)').click()

    cy.get('.subjects-auto-complete__input').type('Computer Science{enter}')

    cy.get('label[for="hobbies-checkbox-1"]').click() // Sports
    cy.get('label[for="hobbies-checkbox-2"]').click() // Reading
    cy.get('label[for="hobbies-checkbox-3"]').click() // Music

    cy.get('#uploadPicture').attachFile('images.jpeg')
    cy.get('#currentAddress').type('Kalanki,Kathmandu')


    cy.get('#state').click()
    cy.get('div[id^="react-select"][id*="-option-"]').contains('Uttar Pradesh').click()
    cy.get('#state').should('contain.text', 'Uttar Pradesh')

    cy.get('#city').click()
    cy.get('div[id^="react-select"][id*="-option-"]').contains('Lucknow').click()
    cy.get('#city').should('contain.text', 'Lucknow')

    // Submit form
    cy.get('#submit').click()

    // Confirm
    cy.get('.modal-content').should('contain', 'Thanks for submitting the form')
  })

  // Negative Test Cases

  it('should not submit form with all fields empty (negative test case)', () => {
    cy.get('#submit').click()
    cy.get('.modal-content').should('not.exist')
  })

  it('should not submit form if phone number is missing (negative test case)', () => {
    cy.get('#firstName').type('Aashish')
    cy.get('#lastName').type('Dhakal')
    cy.get('#userEmail').type('aashish@example.com')
    cy.get('input[name="gender"][value="Male"]').check({ force: true })

    // Don't fill phone number
    cy.get('#submit').click()
    cy.get('.modal-content').should('not.exist')
  })
})

