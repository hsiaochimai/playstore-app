const expect = require('chai').expect;
const { app, appSort, ratingSort } = require('../app');
const request = require('supertest');
const mocha = require('mocha')
var describe = mocha.describe

function checkFilter(arr, genre) {
    let i = 0
    while (i < arr.length) {
        if (!arr[i].Genres.split(';').includes(genre)) {
            return false
        }
        i++
    }
    return true
}

function checkSort(arr, sortFn) {
    let i = 0;
    let sorted = true;
    while (sorted && i < arr - 1) {
        const a = arr[i]
        const b = arr[i + 1]
        sorted = sortFn(a, b) < 0
        if (!sorted) {
            break
        }
        i++;
    }
    return sorted
}

describe('App', () => {
    it('GET /apps should return a message', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
    })
    it('Should return an array of objects', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
            });
    })

    it('Should be 400 if sort is incorrect', () => {
        return request(app)
            .get('/apps')
            .query({ sort: 'jhkhj' })
            .expect(400, 'Sort must be either rating or app')

    });
    it('Should sort by rating', () => {
        return request(app)
            .get('/apps')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(checkSort(res.body, ratingSort)).to.be.true;
            })

    });
    it('Should sort by App', () => {
        return request(app)
            .get('/apps')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(checkSort(res.body, appSort)).to.be.true;
            })

    });

    it('Should filter by Genres', () => {
        return request(app)
            .get('/apps')
            .query({ genre: 'Strategy' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(checkFilter(res.body, 'Strategy')).to.be.true;
            })

    });

});