const Sauce = require('../models/sauce');
const fs = require('fs');
const user = require('../models/user');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);

        }).catch(
        (error) => {
            res.status(404).json({ error: error });
        });
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(
            (sauces) => {
                res.status(200).json(sauces);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};

//------------------------- like/disLike---------------------------------------

exports.likeSauce = (req, res, next) => {

    let sauce;
    let bodyUser = req.body.userId;

    //Je cherche la sauce
    Sauce.findOne({
        _id: req.params.id

    }).then(
        (sauceTrouvee) => {
            sauce = sauceTrouvee //résultat sauce récupéré

            if (req.params.id === 1) { // Si j'aime = 1 
                sauce.updateOne({

                        $inc: { likes: +1 }, //incrémente likes de 1
                        $push: { usersLiked: bodyUser } //ajout 1 au profil user
                    })
                    .then(() => {
                        res.status(200).json({ message: "sauce likée" });

                    }).catch(
                        (error) => {
                            res.status(400).json({ error: error });
                        });

            } else if (req.body.like === -1) { // si j'aime = -1 

                sauce.updateOne({

                        $inc: { disLikes: +1 }, // a verifier
                        $push: { usersDisliked: bodyUser }
                    })
                    .then(() => {
                        res.status(200).json({ message: "sauce dislikée" });

                    }).catch(
                        (error) => {
                            res.status(400).json({ error: error });
                        });

            } else if (like === 0) { //Si j'aime = 0 alors ?

                if (usersLiked.includes(bodyUser)) {

                    console.log(usersLiked.includes(bodyUser));

                    sauce.updateOne({

                            $inc: { likes: -1 }, //décrémente likes de 1
                            $pull: { usersLiked: bodyUser } // retire le like du user dans la BDD
                        })
                        .then(() => {
                            res.status(200).json({ message: "like retiré" });

                        }).catch(
                            (error) => {
                                res.status(400).json({ error: error });
                            });
                };

                if (res.body.usersDisliked) {

                    //si user retire son dislike, décrémentes dislike de 1 et retire le dislike user de la BDD
                    sauce.updateOne({

                            $inc: { disLikes: -1 },
                            $pull: { usersDisliked: bodyUser }
                        })
                        .then(() => {
                            res.status(200).json({ message: "sauce dislikée" });

                        }).catch(
                            (error) => {
                                res.status(400).json({ error: error });
                            });
                };
            };

        }).catch(
        (error) => {
            res.status(404).json({ error: error });
        });
};