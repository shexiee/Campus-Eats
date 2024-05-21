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

// Fetch user data
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

// Update user data
app.put('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, phone_number, dob, course_yr, school_id, username } = req.body;

  try {
    const userRef = db.collection('users').doc(userId);

    // Update user data in Firestore
    await userRef.update({
      firstname,
      lastname,
      phone_number,
      dob,
      course_yr,
      school_id,
      username
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
