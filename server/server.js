const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4000;
// const { signUpWithEmailAndPassword } = require("./firebase/auth")
const knex = require("../db/knex");

// routes
const loginRoutes = require("./routes/user_auth");

function setupServer() {
  const app = express();

  app.use(express.static(path.resolve(__dirname, '../ken-ken-pa/build')));
  app.use(express.json());

  // endpoint /users/login
  app.use('/users', loginRoutes); // '/users/login

  app.get('/hello', (req, res) => {
    res.send('world');
  });

  app.post('/api/memory', async (req, res) => {
    // accepts a users post request for adding a new memory
    const newMemory = req.body;
    console.log(newMemory)
//vhasdbiSaoisdcLKJDHFEf83147
    const userIdObj = await knex('users')
      .select('id')
      .where('UID', '=', newMemory.uid)
      .first();

      //4

    const userId = userIdObj['id']

    const submissionObject = {
      user_id: userId,
      prefecture_id: newMemory.prefecture_id,
      photo_key: newMemory.photo_key,
      description: newMemory.description
    }

    console.log('🤢',submissionObject)
    try {
      await knex('photos').insert(submissionObject)
      res.send(true);
      
    } catch (error) {
      console.log(error)
      res.send(false);
    }

  });

  app.get('/api/mymemories/:uid', async (req, res) => {
    // accepts a users post request for adding a new memory
    const uid = req.params.uid;
    console.log("🤌", uid);
    const userIdObj = await knex('users')
      .select('id')
      .where('UID', '=', uid)
      .first();

    const userId = userIdObj['id']

    console.log('🍎', userId)
    try {
      const mymemories = await knex('photos')
        .innerJoin('prefectures', 'photos.prefecture_id', 'prefectures.id')
        .select('name', 'description', 'photo_key')
        .where('user_id', '=', userId);

      console.log('🍒',mymemories)
      res.send(mymemories);
      
    } catch (error) {
      res.send([]);
    }

  });

  app.get('/api/memory/:prefectureId', async (req, res) => {
    // returns an array of objects that for the specified prefecture
    const prefectureId = req.params.prefectureId;
    // console.log("🦷", prefectureId);
    const memories = await knex('photos').select('photo_key', 'description').where('prefecture_id', '=', prefectureId)

    res.send(memories);
  });

 app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
   
  return app;
};


module.exports = setupServer;