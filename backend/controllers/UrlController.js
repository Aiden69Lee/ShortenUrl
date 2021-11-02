const { checkUrl } = require('../helper/checkUrl');
const { createRandomString } = require('../helper/createRandomString');

exports.manageUrl = async (req, res) => {
  const { url } = req.body;
  const { db } = req;
  const getUrl = checkUrl(url);
  if (!!getUrl) {
    db.query('select * from tbl_urls where original=?', url, (err, getRows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ type: 'error', value: 'Database error'});
      }
      if (getRows.length > 0) {
        return res.status(200).json({ type: 'msg', value: getRows[0].slug})
      }
      
      const pathname = getUrl.pathname;
      const index = pathname.lastIndexOf('/');
      const slug = pathname.substring(index + 1) + createRandomString();

      db.query('insert into tbl_urls (original, slug) values (?, ?)', [url, slug], (err, newRow) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ type: 'error', value: 'Database error'});
        }
        res.status(200).json({ type: 'msg', value: slug})
      });
    });
  }
  else {
    db.query('select * from tbl_urls where slug=?', url, (err, getRows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ type: 'error', value: 'Database error'});
      }
      if (getRows.length > 0) {
        return res.status(200).json({ type: 'link', value: getRows[0].original })
      }
      return res.status(200).json({ type: 'msg', value: 'The shorten url does not exist'});
    })
  }
}