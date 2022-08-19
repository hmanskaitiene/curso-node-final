import assert from 'node:assert'
import chai from 'chai';
import chaiHttp from 'chai-http';
let should = chai.should();
chai.use(chaiHttp);

const url= 'http://localhost:8080';

const cartData = {
    "email": "hanskait@gmail.com",
    "direccion": "Casa 123"
};

const productsDemo = [
    {"id": "62cc7ac3eb7811a29c277c89"},
    {"id": "62cc7ac3eb7811a29c277c8b" }
];

const productsDemoUpdate = [{"id": "62cc7ac3eb7811a29c277c89"}];
const productsDemoDelete = "62cc7ac3eb7811a29c277c8b";

let cartId = 0;

describe('Crear carrito',() => {
    it('Debería poder crear un carrito y obtener un objeto', (done) => {
        chai.request(url)
        .post('/api/carrito')
        .send(cartData)
        .end( (err,res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('email').eql(cartData.email);
            res.body.should.have.property('productos').to.be.an('array');
            cartId = res.body.id;
            done();
        });
    });
});

describe('Agregar productos al carrito',() => {
    it('Debería poder agregar productos al carrito y obtener los productos ingresados', (done) => {
        chai.request(url)
        .post(`/api/carrito/${cartId}/productos`)
        .send(productsDemo)
        .end( (err,res) => {
            res.should.have.status(201);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, 2)
            done();
        });
    });
    it('Debería poder agregar producto al carrito y ver que las cantidad y los totales de precios esten correctos', (done) => {
        chai.request(url)
        .post(`/api/carrito/${cartId}/productos`)
        .send(productsDemoUpdate)
        .end( (err,res) => {
            res.should.have.status(201);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, 2)
            const indiceProductoCarrito = res.body.findIndex(x => (x.id === productsDemoUpdate[0].id) );
            assert.strictEqual(res.body[indiceProductoCarrito].cantidad, 2)
            done();
        });
    });
});

describe('Eliminar productos del carrito',() => {
    it('Debería poder eliminar productos del carrito y ver que las cantidad sean las correctas', (done) => {
        chai.request(url)
        .delete(`/api/carrito/${cartId}/productos/${productsDemoDelete}`)
        .send(productsDemo)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, 1)
            done();
        });
    });
});

describe('Obtener un carrito por email',() => {
    it('Debería poder obtener un carrito pasando el email como argumento', (done) => {
        chai.request(url)
        .get(`/api/carrito/email/${cartData.email}`)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id').eql(cartId);
            res.body.should.have.property('email').eql(cartData.email);
            res.body.should.have.property('productos').to.be.an('array');
            done();
        });
    });
});

describe('Eliminar el carrito carrito',() => {
    it('Debería poder eliminar el carrito', (done) => {
        chai.request(url)
        .delete(`/api/carrito/${cartId}`)
        .send(productsDemo)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});