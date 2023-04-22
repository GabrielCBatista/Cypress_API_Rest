/// <reference types="cypress" />
import loginSchema from '../../contracts/login.contract'
describe('LOGIN - Testes da API ServeRest', () => {
    before(() => {
        cy.cadastroUsuarioMaster()
    });
    it('Login POST com Payload', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                email: 'fabio@teste.com',
                password: 'teste'
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200)
            expect(response).to.satisfy((res) => {
                return res.body.message === 'Login realizado com sucesso' && 
                res.headers['content-type'].includes('application/json')
            })
            expect(response.duration).to.be.lessThan(9000)
            cy.log(response.body.authorization)
        })
    });
    it('Login usando App functions', () => {
        cy.login('fabio@teste.com', 'teste').then((response) => {
            console.log(response)
        })
    });
    it('Teste de contrato de Login', () => {
        cy.login('fabio@teste.com', 'teste')
            .should((response) => {
                return loginSchema.validateAsync(response.body)
            });
    });
});