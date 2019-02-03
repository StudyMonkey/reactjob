const app = require('express')();
const mongoose = require('mongoose');
// 链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
    console.log('mongodb connect success')
})
// 创建模型
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}))

// 新增数据
/* User.create({
    name: 'xiaomao',
    age: 25
}, (err, doc) => {
    if (!err) {
        console.log(doc)
    } else {
        console.log(err);
    }
}) */

// 删除数据
/* User.remove({age: 25}, (err,doc) => {
    console.log(doc);
}) */

// 更新数据
/* User.update({name: 'xiaomao'}, {$set: {age: 24}}, (err, doc) => {
    console.log(doc);
}) */

app.get('/', (req, res) => {
    res.end('Hello World\n');
});

app.get('/data', (req, res) => {
    User.find({}, (err, doc) => {
        if(!err) {
            res.json(doc)
        } else {
            console.log(err);
        }
    })
    //res.json({name: 'xiaoMao', type: 'IT'})
});

app.listen(9001, () => {
    console.log('Server listen 9001');
})