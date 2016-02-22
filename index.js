var unirest = require('unirest');

var face = (function (opt) {

    var options = '';

    opt.faceID? options += 'returnFaceId=true' : options += 'returnFaceId=false';
    opt.FaceLandmarks? options += '&returnFaceLandmarks=true' : options += '&returnFaceLandmarks=false';
    opt.faceAttributes? options += '&returnFaceAttributes=age,gender,headPose,smile,facialHair' : options += '';

    unirest.post('https://api.projectoxford.ai/face/v1.0/detect?' + options)
    .header('Ocp-Apim-Subscription-Key', opt.secretKey)
    .header('Content-Type', 'application/json')
    .send({ url: opt.imageUrl })
    .end(function (response) {
        console.log(response.body);
        console.log(response.body[0].faceAttributes.facialHair);
    });
});

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = face;
}
else {
    window.aragonite = face;
}

face({
    imageUrl: 'http://www.c3centricity.com/newblog/wp-content/uploads/2013/06/Kozzi-shocked-man-face-588-X-883-e1375691534221.jpg?bb65e1',
    secretKey: '256d5339466d4532bc86d699813d3653',
    faceId: true,
    FaceLandmarks: false,
    faceAttributes: true
})