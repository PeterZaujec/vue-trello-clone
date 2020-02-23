const addItemToLastList = (itemName) => {
    cy.get('.lists-container section .item-entry').eq(-1).type(itemName);
    cy.get('.lists-container section .item-entry button.is-primary').eq(-1).should('be.enabled').click();
    cy.get('.modal .textarea').eq(-1).type('Description of first item');
    cy.get('.modal input[type=date]').eq(-1).type('2020-06-14');
    cy.get('.modal .button.is-primary').should('be.enabled').click();
    cy.get('.lists-container section .item-title').eq(-1).contains(itemName);
}

const addNewList = (listName) => {
    cy.get('.new-list').type(listName);
    cy.get('.new-list button.is-primary').should('be.enabled').click();
    cy.get('.list-header').contains(listName);
    cy.get('.clear-button .button.is-button').should('be.enabled');
    cy.get('.modal .button.is-primary').should('be.enabled');
    cy.get('.new-list button.is-primary').should('be.disabled');
}

const editItemInList = (listIndex, itemIndex, itemName) => {
    cy.get('.lists-container section').eq(listIndex).find('.icon-edit').invoke('show').click();
    cy.get('.modal .input[name=title]').clear().type(itemName);
    cy.get('.modal .button.is-primary').click();
    cy.get('.lists-container section').eq(listIndex).find('.item-title').eq(itemIndex).should('have.text', itemName);
}

describe('Add new lists, items and reset lists', () => {
    before(() => {
        cy.visit('http://localhost:8080/');
        cy.get('.clear-button .button.is-button').should('be.disabled');
        cy.get('.new-list button.is-primary').should('be.disabled');
    })

    it('Add first list', () => {
        cy.get('.new-list').type('List 1');
        cy.get('.new-list button.is-primary').should('be.enabled').click();
        cy.get('.lists-container section .list-header').eq(-1).contains('List 1');
        cy.get('.clear-button .button.is-button').should('be.enabled');
        cy.get('.new-list button.is-primary').should('be.disabled');
        cy.get('.lists-container section .item-entry button.is-primary').eq(-1).should('be.disabled');
    })

    it('Add item to first list', () => addItemToLastList('Item 1'))

    it('Add second list', () => addNewList('List 2'))

    it('Add item to second list', () => addItemToLastList('Item 2'))

    it('Edit item in first list', () => editItemInList(0, 0, 'Updated Item 1'))
    
    it('Edit item in second list', () => editItemInList(1, 0, 'Updated Item 2'))

    it('Add third list', () => addNewList('List 3'))

    it('Reset all lists', () => {
        cy.get('.clear-button .button.is-button').should('be.enabled').click();
        cy.window().then((win) => {
        });
        cy.get('.clear-button .button.is-button').should('be.disabled');
        cy.get('.new-list button.is-primary').should('be.disabled');
    })
})