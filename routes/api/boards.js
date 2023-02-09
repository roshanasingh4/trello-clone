const express = require('express');
const router = express.Router;
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User')
const Boards = require('../../models/Boards')

//Add a board

router.post('/', [
    [auth, [check('title', 'Title is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, backgroundUrl } = req.body;

            //create and save the board
            const newBoard = new Board ({ title, backgroundUrl });
            const board = await await newBoard.save();

            // add board to user's boards

            const user = await User.findById(req.user.id);
            user.boards.unshift(board.id);
            await user.save();

            //add user to board's member as admin
            boards.member.push({ user: user.id, name: user.name });

            //log activity
            board.activity.unshift({
                text: `${user.name} created this board`
            });
            await board.save();

            res.json(board);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
])