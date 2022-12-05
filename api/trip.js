const express = require('express');

const router = express.Router();
const tripSchedules = require('../fake-data/tripSchedules');

router.get('/trip-log', (req, res) => {
  try {
    const { category, keyword } = req.query;

    const responseSchedules = tripSchedules.processMainTripSchedules(category, keyword);

    res.json({
      status: 200,
      data: responseSchedules,
    });
  } catch (e) {
    // console.error(e);
    res.status(401).send({ error: '잘못된 정보' });
  }
});

module.exports = router;
