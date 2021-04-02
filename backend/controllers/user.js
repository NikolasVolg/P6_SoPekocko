const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userSchema = require('../middleware/schema/userSchema');
const MaskData = require('maskdata');

exports.signup = async(req, res, next) => {
    try {
        const valid = await userSchema.validateAsync(req.body);
        if (valid) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: MaskData.maskEmail2(req.body.email),
                        password: hash
                    })
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            throw error('input invalid');
        };
    } catch (error) {
        res.status(400).json({ error });
    };
};

exports.login = async(req, res, next) => {
    try {
        const valid = await userSchema.validateAsync(req.body);
        if (valid) {
            User.findOne({ email: MaskData.maskEmail2(req.body.email) })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                    }
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect !' });
                            }
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            throw error('input invalid');
        }
    } catch {
        rres.status(400).json({ error });
    }
};