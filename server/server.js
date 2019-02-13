const app = require('express')();
const userRoute = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 9001;

app.use(cookieParser());
app.use(bodyParser.json()); // 使post请求拿到req.body的值
app.use('/user', userRoute);

/* mongoose.connection.on('connected', () => {
    console.log('mongodb connect success')
})
// 创建模型
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
})) */

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
/* User.remove({name: 'xiaonan'}, (err,doc) => {
    console.log(doc);
}) */

// 更新数据
/* User.update({name: 'xiaomao'}, {$set: {age: 24}}, (err, doc) => {
    console.log(doc);
}) */

/* app.get('/', (req, res) => {
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
}); */

app.listen(port, () => {
    console.log(`Server listen ${port}`);
})