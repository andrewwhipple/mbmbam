var request = require('request');


request({
    uri: 'http://localhost:3000/clip',
    method: 'POST',
    form: {
        title: 'Testerino',
        description: 'What a description, y\'all',
        mp3: 'http://traffic.libsyn.com/mbmbam/MyBrotherMyBrotherandMe317.mp3',
        in_point: 400,
        out_point: 420,
        user: 'Andrew'
    }, function(error, response, body) {
        if (err) {
            return console.error('upload failed', err);
        }
        console.log('Upload successful! Server responded with: ', body);
    }
});
