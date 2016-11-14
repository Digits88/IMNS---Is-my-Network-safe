/*jslint browser: true*/
/*global $, jQuery, alert*/

var main = function () {
    'use strict';

    //DOM cache
    var $labelInput = $('#networknameInput'),
        $searchpic = $('#searchpic'),
        $networkname = $('#networkname'),
        $manuf = $('#manuf'),
        $gps_koords = $('#gps_koords'),
        $encryption = $('#encryption');

    var getNetInfo = function () {
        var $labelInputData = $('input[id=networknameInput]').val();
        $.ajax({
            url: '../data/php/Askdb.php',
            method: 'POST',
            dataType: 'JSON',
            data: 'masha=' + $labelInputData,
            success: function (data) {
                $networkname.attr('value', data.essid);
                $manuf.attr('value', data.manuf);
                $gps_koords.attr('value', "Y: " + data.GPSBestLAT + " / X: " + data.GPSBestLon);
                $encryption.attr('value', data.encryption);
            },
            error: function (xhr, error) {
                //console.log(xhr);
                //console.log(error);
            }
        });
    };

    $labelInput.click( function() {
        SearchAnimation();
    });

    $searchpic.click(function () {
        getNetInfo();
        VisualsizeDataAnimation();
    });

    $labelInput.keypress(function (e) {
        if (e.keyCode === 13){
            getNetInfo();
            VisualsizeDataAnimation();
        }
    });

    var VisualsizeDataAnimation = function () {
            $('.resultInfo').fadeIn({queue:false,duration:3000});
            $('.resultInfo').animate({
                height: '275px'
            }, 1500 );
    };

    var SearchAnimation = function () {
        $('.searchwrap').animate({
            height: '82px',
            width: '506',
        }, 800);

        $labelInput.animate({
            marginTop: '20px',
            queue: false
        },800);
    };
};

$(document).ready(main);
