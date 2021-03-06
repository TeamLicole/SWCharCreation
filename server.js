// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/api/login', (req, res) => {
  if (!req.body.password || !req.body.username)
    return res.status(400).send();
      knex('users').where('username',req.body.username).first().then(user => {
        if (user === undefined) {
          res.status(403).send("Invalid credentials");
          throw new Error('abort');
        }
        return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users', (req, res) => {
  if (!req.body.password || !req.body.username)
    return res.status(400).send();
    knex('users').where('username',req.body.username).first().then(user => {
      if (user !== undefined) {
        res.status(403).send("Username already exists");
        throw new Error('abort');
      }
      return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({hash: hash, username:req.body.username});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.get('/api/users/:id/chars', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('chars','users.id','chars.user_id')
    .where('users.id',id)
    .select('name', 'gender', 'species', 'alignment','username').then(chars => {
      res.status(200).json({chars:chars});
    }).catch(error => {
      console.log("error: " + error);
      res.status(500).json({ error });
    });
});

app.post('/api/users/:id/chars', (req, res) => {
  let id = parseInt(req.params.id);

  knex('chars').where('name',req.body.name).first().then(char => {
    if (char !== undefined) {
      console.log("char is not undefined");
      res.status(403).send("That character name already exists");
      throw new Error('abort');
    }
      knex('users').where('id',id).first().then(user => {
        return knex('chars').insert({user_id: id, name:req.body.name, gender:req.body.gender, species:req.body.species,
          alignment:req.body.alignment});
      }).then(ids => {
        return knex('chars').where('id',ids[0]).first();
      }).then(char => {
        res.status(200).json({char:char});
        return;
      })
  }).catch(error => {
    console.log("in the catch");
    if (error.message !== 'abort') {
      console.log("the error is: ", error);
      res.status(500).json({ error });
    }
  });
});

app.delete('/api/users/:id/chars/:name', (req, res) => {
  let id = parseInt(req.params.id);
  console.log("id = ", id);
  console.log("name = ", req.params.name);
  knex('users').where('id',id).first().then(user => {
    return knex('chars').where({'user_id':id,name:req.params.name}).first().del();
  }).then(chars => {
    res.sendStatus(200);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.put('/api/users/:id/chars', (req, res) => {
  let id = parseInt(req.params.id);
  console.log("char in put: ", req.body.name, req.body.gender, req.body.species, req.body.alignment);
  knex('chars').where('user_id', id).andWhere('name', req.body.name).first().then(user => {
    return knex('chars').update({user_id: id, name:req.body.name, gender:req.body.gender, species:req.body.species,
      alignment:req.body.alignment});
  }).then(ids => {
    return knex('chars').where('id',ids[0]).first();
  }).then(char => {
    res.status(200).json({char:char});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3003, () => console.log('Server listening on port 3003!'));
