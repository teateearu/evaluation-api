const router = require('express').Router()
const passport = require('../config/auth')
const { Evaluation } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

  router
    .get('/evaluations', (req, res, next) => {
      Evaluation.find()
        // Newest evaluations first
        .sort({ date: -1 })
        // Send the data in JSON format
        .then((evaluations) => res.json(evaluations))
        // Throw a 500 error if something goes wrong
        .catch((error) => next(error))
    })
    .get('/evaluations/:id', (req, res, next) => {
      const id = req.params.id

      Evaluation.findById(id)
        .then((evaluation) => {
          if (!evaluation) { return next() }
          res.json(evaluation)
        })
        .catch((error) => next(error))
    })

    .post('/evaluations', authenticate, (req, res, next) => {
      let newEvaluation = req.body

      Evaluation.create(newEvaluation)
        .then((evaluation) => res.json(evaluation))
        .catch((error) => next(error))
    })

    .put('/evaluations/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      const updatedEvaluation = req.body

      Evaluation.findByIdAndUpdate(id, { $set: updatedEvaluation }, { new: true })
        .then((evaluation) => {

          res.json(evaluation)
        })
        .catch((error) => next(error))
    })
    .patch('/evaluations/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      const patchForEvaluation = req.body

      Evaluation.findById(id)
        .then((evaluation) => {
          if (!evaluation) { return next() }

          const updatedEvaluation = { ...evaluation, ...patchForEvaluation }

          Evaluation.findByIdAndUpdate(id, { $set: updatedEvaluation }, { new: true })
            .then((evaluation) => {

              res.json(evaluation)
            })
            .catch((error) => next(error))
        })
        .catch((error) => next(error))
    })
    .delete('/evaluations/:id', authenticate, (req, res, next) => {
      const id = req.params.id
      Evaluation.findByIdAndRemove(id)
        .then(() => {

          res.status = 200
          res.json({
            message: 'Removed',
            _id: id
          })
        })
        .catch((error) => next(error))
    })

module.exports = router
