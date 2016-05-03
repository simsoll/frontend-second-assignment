var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/products', function(req, res, next) {
  res.json([
  {
    "id": 1,
    "title": "Old Rasputin",
    "style": "Russian Imperial Stout"
  },
  {
    "id": 2,
    "title": "Speedway Stout",
    "style": "Imperial Stout"
  }
])
});

module.exports = router;
