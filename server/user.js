const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const utils = require('utility');
const _filter = {'pwd': 0, '__v': 0};

Router.get('/list', function(req, res){
    // User.remove({}, function(e,d){});
    User.find({}, function(err, doc) {
        if (err) {
            console.log(err)
        }
        return res.json(doc);
    })
});

Router.post('/register', function(req, res){
    console.log(req.body);
    const { user, pwd, type } = req.body;
    User.findOne({user}, function(err, doc){
        if(doc){
            return res.json({code: 1, msg: '用户名已存在'})
        }

        const userModel = new User({user, pwd: md5Pwd(pwd), type});
        userModel.save( (e, d) => {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {user, type, _id}})
        })
/*         User.create({user, pwd: md5Pwd(pwd), type}, function(e, d){
            if(e){
                return res.json({code: 1, msg: '后端出错了'})
            }
            return res.json({code: 0})
        }) */
    })
})

Router.post('/login', function(req, res) {
    console.log(req.body);
    const { user, pwd } = req.body;
    User.findOne({user, pwd:md5Pwd(pwd)}, _filter, (err, doc) => {
        if( !doc ) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('userid', doc._id);  // 通过cookie-parser设置页面cookie
        return res.json({code: 0, data: doc})
    })
})
Router.get('/info', function(req, res){
    console.log(req.cookies);
    const { userid } = req.cookies;
    if ( !userid ) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, (err, doc) => {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
    
})

function md5Pwd(pwd){
    const salt = 'xiaomao_-~!@#$%^&*()[]{}XM';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;