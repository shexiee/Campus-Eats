const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();

const serviceAccount = require("D:\\3rd Yr @nd Sem\\capstone\\campus-eats-7db76-firebase-adminsdk-2uijc-87ecb35284.json");


app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();


app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const userRef = db.collection('users').doc(userId);
      const userSnap = await userRef.get();
  
      if (!userSnap.exists) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userData = userSnap.data();
      return res.status(200).json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

app.listen(5000, () => console.log('Server running on http://localhost:5000'));