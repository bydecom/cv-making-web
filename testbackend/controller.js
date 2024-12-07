const { enhanceEmail } = require('./callapi')
const EnhanceEmail = async (req, res) => {
  return res.json(await enhanceEmail(req.body.Email))
}

module.exports = { EnhanceEmail }
