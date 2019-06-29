

const { body, validationResult } = require('express-validator/check');

const express = require('express');

const router = express.Router();

router.post(
    '/',

    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            res.send('Thank you for your registration!');
        } else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

module.exports = router;
