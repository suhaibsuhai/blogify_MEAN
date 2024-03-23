const express = require('express');
const router = express.Router();
const Post = require('../Backend/Models/Post.js');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    Post.find()
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            console.log('Error Occurs While fetching Data' + err);
            res.status(500).send('Internal Error', err);
        });
});


router.post('/', (req, res) => {
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    });

    post.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            console.log('Internal Error:' + err);
            res.status(500).send('Internal Error:' + err);
        });
});

router.get('/:id', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Post.findById(req.params.id)
            .then(doc => {
                if (doc) {
                    res.send(doc);
                } else {
                    res.status(404).send('No record found');
                }
            })
            .catch(err => {
                console.log('Internal Error:' + err);
                res.status(500).send('Internal error:' + err);
            });
    } else {
        res.status(400).send('Invalid ID');
    }
});

router.delete('/:id', (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                if (!deletedPost) {
                    return res.status(404).send('No record found');
                }
                res.send(deletedPost);
            })
            .catch(err => {
                console.log('Internal Error:' + err);
                res.status(500).send('Internal error:' + err);
            });
    } else {
        res.status(400).send('Invalid ID');
    }
});

router.put('/:id', (req, res) => {
    let post = {
        title: req.body.title,
        content: req.body.content,
        username: req.body.username
    };

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Post.findByIdAndUpdate(req.params.id, { $set: post }, { new: true })
            .then(doc => {
                if (doc) {
                    res.send(doc);
                } else {
                    res.status(404).send('No record found');
                }
            })
            .catch(err => {
                console.log('Internal Error:' + err);
                res.status(500).send('Internal error:' + err);
            });
    } else {
        res.status(400).send('Invalid ID');
    }
});

module.exports = router;
