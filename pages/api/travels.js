// pages/api/read.js
import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await executeQuery({
        query: 'CALL GetAllTravelDetails()',
        values: [],
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
