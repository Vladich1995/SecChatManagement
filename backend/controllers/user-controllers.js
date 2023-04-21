const mongoose = require('mongoose');
const User = require("../models/user");

const addUser = async (req, res, next) => {
    const {name, number} = req.body;
    const authorized = "false";
    const newUser = new User({
        name,
        number,
        authorized
    });
    try{
        await newUser.save();
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.json({ success: false });
    }
}

const getUsers = async (req, res, next) => {
    let usersList;
    try{
        usersList = await User.find();
    }catch (err) {
        return next(err);
    };
    res.json({ users: usersList.map(user => user.toObject({ getters: true }))});
}

const deleteUser = async (req, res, next) => {
    const number = req.body.number;
    const name = req.body.name;
    let deleteResult;
    try{
        deleteResult = await User.deleteOne({number: number, name: name});
        res.json({success: true});
    }catch (err) {
        console.log(err);
        res.json({success: false});
    };
}

exports.addUser = addUser;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;