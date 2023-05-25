import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // for dev
      // const response = await axios.post('http://localhost:5000/api/submit', req.body, {
      const response = await axios.post('http://backend:5000/api/submit', req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = response;
      const times = data.data.result;

      res.status(200).json(times);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
