const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const serviceAccount = require("C:\\Users\\carro\\Downloads\\campus-eats-7db76-firebase-adminsdk-2uijc-7c19b0be9b.json");
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

    await admin.auth().updateUser(userId, {
      displayName: username
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
// get user role
app.get('/api/user-role/:uid', async (req, res) => {
  const userId = req.params.uid;

  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const accountType = userData.account_type;
    return res.status(200).json({ accountType: accountType });
  } catch (error) {
    console.error('Error getting user role:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new shop with image upload
app.post('/api/shop-application', upload.single('image'), async (req, res) => {
  const {
    shopName,
    shopDesc,
    shopAddress,
    googleLink,
    categories,
    uid,
    shopOpen,
    shopClose,
    GCASHName,
    GCASHNumber,
    displayName
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
    const dasherDoc = await db.collection('dashers').doc(uid).get();
    if (dasherDoc.exists) {
      return res.status(400).json({ error: 'You have already submitted a dasher application' });
    }

    const shopDoc = await db.collection('shops').doc(uid).get();
    if (shopDoc.exists) {
      return res.status(400).json({ error: 'You have already submitted a shop application' });
    }


    const fileName = `shop/govID/${displayName}_${uid}`;
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
        govId: imageURL,
        status: 'pending',
        shopOpen,
        shopClose,
        GCASHName,
        GCASHNumber,
        deliveryFee: 10,
      });

      return res.status(200).json({ message: 'Shop created successfully' });
    });
    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error creating shop:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/dasher-application', upload.single('image'), async (req, res) => {
  const {
    days,
    uid,
    availableStartTime,
    availableEndTime,
    GCASHName,
    GCASHNumber,
    displayName
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
    const dasherDoc = await db.collection('dashers').doc(uid).get();
    if (dasherDoc.exists) {
      return res.status(400).json({ error: 'You have already submitted a dasher application' });
    }

    const shopDoc = await db.collection('shops').doc(uid).get();
    if (shopDoc.exists) {
      return res.status(400).json({ error: 'You have already submitted a shop application' });
    }
    const fileName = `dasher/schoolID/${displayName}_${uid}`;
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
      await db.collection('dashers').doc(uid).set({
        daysAvailable: JSON.parse(days),
        schoolId: imageURL,
        status: 'pending',
        availableStartTime,
        availableEndTime,
        GCASHName,
        GCASHNumber,

      });

      return res.status(200).json({ message: 'Dasher created successfully' });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error creating shop:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
