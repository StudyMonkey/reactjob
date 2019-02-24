const app = require('express')();
const userRoute = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');
const Chat = model.getModel('chat');
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {

    socket.on('sendmsg', function(data){
        const {from, to, content} = data;
        const chatid = [from,to].sort().join('_');
        const create_time = new Date().getTime();
        Chat.create({chatid, from, to, content, create_time}, function(err, doc){debugger
            io.emit('recvmsg', Object.assign({}, doc._doc));
        })
/*         console.log({data});
         */
    })
    
})

const port = 9001;

app.use(cookieParser());
app.use(bodyParser.json()); // 使post请求拿到req.body的值
app.use('/user', userRoute);

server.listen(port, () => {
    console.log(`Server listen ${port}`);
})