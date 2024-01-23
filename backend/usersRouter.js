const express = require('express');
const usersRouter = express.Router();
const Users = require('./models/usersModel');

// Check user

usersRouter.get('/:email/:password', async (req, res) => {
  try {
    const filter = {
      email: req.params.email,
      password: req.params.password,
    };

    const users = await Users.find(filter);

    if (users.length !== 0) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add user

usersRouter.post('/', async (req, res) => {
  try {
    const validEmail = await Users.find({ email: req.body.email });

    if (validEmail.length === 0) {
      const newUser = await Users(req.body);
      newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET contacts of user

usersRouter.get('/:email', async (req, res) => {
  try {
    const filter = {
      email: req.params.email,
    };
    const userContacts = await Users.find(filter);
    res.status(200).json(userContacts);
  } catch (error) {
    res.status.json({ message: error.message });
  }
});

// Add new contacts of user

usersRouter.put('/:email', async (req, res) => {
  try {
    const filter = { email: req.params.email };
    const update = {
      $push: {
        contacts: {
          id: req.body.id,
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          lastSeen: '',
          chat: [],
          newMessage: false,
        },
      },
    };
    const newContacts = await Users.updateOne(filter, update);
    res.status(200).json(newContacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Send Messages

usersRouter.put('/sendMessage/:myNumber/:contactNumber', async (req, res) => {
  try {
    const sendFilter = {
      phone: req.params.myNumber,
      'contacts.phoneNumber': req.params.contactNumber,
    };
    const sendUpdate = {
      $push: {
        'contacts.$.chat': {
          id: req.body.id,
          message: req.body.message,
          time: req.body.time,
        },
      },
    };
    const sendMessages = await Users.updateOne(sendFilter, sendUpdate);
    res.status(200).json(sendMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Receive Messages

usersRouter.put(
  '/receiveMessage/:contactNumber/:myNumber',
  async (req, res) => {
    try {
      const receiveFilter = {
        phone: req.params.contactNumber,
        'contacts.phoneNumber': req.params.myNumber,
      };
      const receiveUpdate = {
        $push: {
          'contacts.$.chat': {
            id: req.body.id,
            message: req.body.message,
            time: req.body.time,
            received: req.body.received,
          },
        },
      };
      const receiveMessages = await Users.updateOne(
        receiveFilter,
        receiveUpdate
      );
      res.status(200).json(receiveMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// delete messages

usersRouter.delete(
  '/deleteMessage/:myNumber/:contactNumber',
  async (req, res) => {
    try {
      const filter = {
        phone: req.params.myNumber,
        'contacts.phoneNumber': req.params.contactNumber,
      };
      const update = {
        $pull: {
          'contacts.$.chat': {
            id: req.body.messageId,
            message: req.body.message,
            time: req.body.time,
          },
        },
      };

      const messages = await Users.updateOne(filter, update);
      res.status(200).json(messages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// read Messages

usersRouter.put('/readMessage/:phone/:contactNumber', async (req, res) => {
  try {
    const filter = {
      phone: req.params.phone,
      'contacts.phoneNumber': req.params.contactNumber,
    };
    const update = {
      $set: { 'contacts.$.newMessage': req.body.status },
    };
    const readMessage = await Users.updateOne(filter, update);
    res.status(200).json(readMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// set Counter Messages

usersRouter.put('/setCounterPlus/:phone/:contactNumber', async (req, res) => {
  try {
    const filter = {
      phone: req.params.phone,
      'contacts.phoneNumber': req.params.contactNumber,
    };
    const update = {
      $set: { 'contacts.$.countMessage': req.body.countMessage + 1 },
    };
    const counter = await Users.updateOne(filter, update);
    res.status(200).json(counter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// set Counter Zero

usersRouter.put('/setCounterZero/:phone/:contactNumber', async (req, res) => {
  try {
    const filter = {
      phone: req.params.phone,
      'contacts.phoneNumber': req.params.contactNumber,
    };
    const update = {
      $set: { 'contacts.$.countMessage': 0 },
    };
    const counter = await Users.updateOne(filter, update);
    res.status(200).json(counter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = usersRouter;
