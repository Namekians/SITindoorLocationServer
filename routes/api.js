var express = require('express');
var DAO = require('../DAO')
var fs = require('fs');

var router = express.Router();

// provide json data for web and android

router.route('/buildings/:buildingId?')
    .get(function(req, res) {
        console.log('current path: ' + req.path);
        res.end('current path: ' + req.path);
    });



router.route('/buildings/:buildingId/floors/:floorId?')
    .get(function(req, res) {
        var buildingId = req.params.buildingId;
        var floorId = req.params.floorId;

        var query = {};
        var pattern = '/' + buildingId + '\d{2}/'

        floorId === undefined ? query = {
            floorId: {
                $regex: pattern
            }
        } : query = {
            floorId: buildingId + '' + floorId
        };

        //collection,query,callbacks
        DAO.quickFind('floors', query, function(docs) {
            res.send(JSON.stringify(docs));
        });

    });


/*
router.route('/buildings/:buildingId/floors/:floorId/offices/:officeId?')
    .get(function (req, res) {
        console.log('current path: ' + req.path);
        res.end('current path: ' + req.path);
    });
*/

router.route('/buildings/:buildingId/floors/:floorId/beacons/:beaconId?')
    .get(function(req, res) {
        var buildingId = req.params.buildingId,
            floorId = req.params.floorId,
            beaconId = req.params.beaconId;

        if (beaconId) {
            /*





            more to do here






            */


            res.redirect('/json/calendar.json')


        } else {
            var query = {
                beaconGroupId: buildingId + '' + floorId
            };
            //collection,query,callbacks
            DAO.quickFind('beacons', query, function(docs) {
                //check the robustness of doing this
                res.send(JSON.stringify(docs[0]));

            });
        }




    });
//http://localhost:3000/api/buildings/10/floors/04/offices/419
router.route('/buildings/:buildingId/floors/:floorId/offices/:officeId')
    .get(function(req, res, next) {
        var buildingId = req.params.buildingId,
            floorId = req.params.floorId,
            officeId = req.params.officeId;

        fs.readFile('G:/Github_Projects/SITindoorLocationService/Server/public/resources/' + buildingId + floorId + officeId + '/upload.html', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }
            var result = StringtoHTML(data);
            res.send(result);
        });


    });

router.route('/buildings/:buildingId/floors/:floorId/offices/:officeId/messages')
    .get(function(req, res, next) {
        var buildingId = req.params.buildingId,
            floorId = req.params.floorId,
            officeId = req.params.officeId;
        var query = {
            messageGroupId: buildingId + '' + floorId + '' + officeId
        };
        DAO.quickFind('messages', query, function(docs) {

            res.send(JSON.stringify(docs[0]));
        });

    })
    .post(function(req, res, next) {
        var buildingId = req.params.buildingId,
            floorId = req.params.floorId,
            officeId = req.params.officeId;
        console.log('somebody reach here');
        console.log(req.body);
        DAO.quickInsert('messages', {
            messageGroupId: buildingId + '' + floorId + '' + officeId
        }, {
            $push: {
                messages: req.body
            }
        }, function() {
            res.sendStatus(200)
        });

    });

function StringtoHTML(value) {
    if (value == null) return "";
    value = value.replace(/\\r\\n/g, "<BR>&nbsp;&nbsp;&nbsp;&nbsp;");
    value = value.replace(/\\r/g, "<BR>&nbsp;&nbsp;");
    value = value.replace(/\\n/g, "<BR>&nbsp;&nbsp;");
    return value;
}
module.exports = router;
