'use strict';

// there has to be a better way to bootstrap package models for mocha tests
require('../models/article');
require('../../../users/server/models/user');

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

/**
 * Globals
 */
var user;
var article;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
    describe('Model Article:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                article = new Article({
                    title: 'Article Title',
                    content: 'Article Content',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return article.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';

                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without content', function(done) {
                article.content = '';

                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without user', function(done) {
                article.user = {}

                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

        });

        afterEach(function(done) {
            article.remove();
            user.remove();
            done();
        });
    });
});
