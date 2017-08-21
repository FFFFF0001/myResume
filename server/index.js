const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello , this is server home . \n\r May be , you shoule open the resume page.')
})

module.exports = router;
