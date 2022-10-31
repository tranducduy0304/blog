const mongoose = require('mongoose');

async function connect() {
    const dbUrl = 'mongodb://127.0.0.1:27017/blog';
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('ERROR:   ' + error);
        console.log('Connect fail!');
    }
}
//export default connect;
module.exports = {connect}