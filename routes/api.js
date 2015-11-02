var express = require('express');
var DAO = require('../DAO')

var router = express.Router();

// provide json data for web and android

router.route('/buildings/:buildingId?')
    .get(function (req, res) {
        console.log('current path: ' + req.path);
        res.end('current path: ' + req.path);
    });



router.route('/buildings/:buildingId/floors/:floorId?')
    .get(function (req, res) {
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
        DAO.quickFind('floors', query, function (docs) {
            res.send(docs);
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
    .get(function (req, res) {
        var buildingId = req.params.buildingId;
        var floorId = req.params.floorId;
        var beaconId = req.params.beaconId;

        if (beaconId) {

        } else {
            var query = {
                beaconGroupId: buildingId + '' + floorId
            };
            //collection,query,callbacks
            DAO.quickFind('beacons', query, function (docs) {
                //check the robustness of doing this
                res.send(docs.substring(1, docs.length - 1));
            });
        }




    });



module.exports = router;