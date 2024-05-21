const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const serviceAccount = require("D:\\3rd Yr @nd Sem\\capstone\\campus-eats-7db76-firebase-adminsdk-2uijc-87ecb35284.json");

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage()
});

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

// Add new shop with image upload
app.post('/api/shop', upload.single('image'), async (req, res) => {
  const {
    shopName,
    shopDesc,
    shopAddress,
    googleLink,
    categories,
    uid,
    shopOpen,
    shopClose,
  } = req.body;

  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  if (!uid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Upload image to Firebase Storage under shop/govID folder
    const fileName = `shop/govID/${uid}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.error('Error uploading image to Firebase Storage:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });

    blobStream.on('finish', async () => {
      const imageURL = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

      // Store shop data in Firestore
      await db.collection('shops').doc(uid).set({
        shopName,
        shopDesc,
        shopAddress,
        googleLink,
        categories: JSON.parse(categories),
        imageURL,
        status: 'pending',
        shopOpen,
        shopClose,
      });

      return res.status(200).json({ message: 'Shop created successfully' });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error creating shop:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
