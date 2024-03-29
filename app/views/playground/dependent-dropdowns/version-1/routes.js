const express = require('express')
const router = new express.Router()

const utils = require('./utils')

router.use('/', (req, res, next) => {
  req.section = req.originalUrl.split('/')[1]
  req.feature = req.originalUrl.split('/')[2]
  req.version = req.originalUrl.split('/')[3]
  next()
})

// Route index page
router.get('/', function (req, res) {
  req.session.destroy()
  res.redirect(`/${req.section}/${req.feature}/${req.version}/search`)
})

// Route for search
router.get('/search', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/offences`,
    {
      base: req.baseUrl,
      classes: utils.getOffences().classes
    })

})

router.get('/data/bands', function (req, res) {
  var data = { output: utils.getOffenceBands(req.session.data.class[0]) , selected: req.session.data.offence_band }
  res.json(data)
})

router.get('/data/categories', function (req, res) {
  var data = { output: utils.getOffenceCategories(req.session.data.class[0], req.session.data.band[0]) , selected: req.session.data.offence_category }
  res.json(data)
})

// Add your routes above this line
module.exports = router