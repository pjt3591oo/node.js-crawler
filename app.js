  /*var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('a').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            c.queue(toQueueUrl);
        });
    }
});

// Queue just one URL, with default callback
c.queue('http://joshfire.com');

// Queue a list of URLs
c.queue(['http://jamendo.com/','http://tedxparis.com']);

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'http://parishackers.org/',
    jQuery: false,

    // The global callback won't be called
    callback: function (error, result) {
        console.log('Grabbed', result.body.length, 'bytes');
    }
}]);

// Queue using a function
var googleSearch = function(search) {
  return 'http://www.google.fr/search?q=' + search;
};
c.queue({
  uri: googleSearch('cheese')
});

// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);*/
/*

var request = require('request');

var fs = require('fs');

url = "https://ko.wikipedia.org/wiki/%EC%A0%95%EA%B7%9C_%ED%91%9C%ED%98%84%EC%8B%9D";


request(url,function(err, res, ht){
	if(!err){
		//console.log(ht);
		urlSplits(ht)
		//fs.appendFile('e.txt',JSON.stringify(res),'utf-8', function(err){})
		//fs.appendFile('e.txt',urlSplits(JSON.stringify(res)),'utf-8', function(err){})

	}else{

	}
});

function urlSplits(urls){
	var surl = url.split("'");
	var patter; // url�̾��ִ� ���ϵ���




	var myRe = new RegExp([sS][rR][cC]\s*=\s*(?:'|")([^("|')]*)(?:'|"));
	var myArray = myRe.exec(urls);


	console.log(JSON.stringify(myArray));
	fs.appendFile('e.txt',JSON.stringify(myArray),'utf-8', function(err){});
	//var yourArray = _(obj).toArray();



	//var rUrlRegex = /(?:(?:(https?|ftp|telnet):\/\/|[\s\t\r\n\[\]\`\<\>\"\'])((?:[\w$\-_\.+!*\'\(\),]|%[0-9a-f][0-9a-f])*\:(?:[\w$\-_\.+!*\'\(\),;\?&=]|%[0-9a-f][0-9a-f])+\@)?(?:((?:(?:[a-z0-9\-��-�R]+\.)+[a-z0-9\-]{2,})|(?:[\d]{1,3}\.){3}[\d]{1,3})|localhost)(?:\:([0-9]+))?((?:\/(?:[\w$\-_\.+!*\'\(\),;:@&=��-����-�Ӱ�-�R]|%[0-9a-f][0-9a-f])+)*)(?:\/([^\s\/\?\.:<>|#]*(?:\.[^\s\/\?:<>|#]+)*))?(\/?[\?;](?:[a-z0-9\-]+(?:=[^\s:&<>]*)?\&)*[a-z0-9\-]+(?:=[^\s:&<>]*)?)?(#[\w\-]+)?)/gmi;

	//console.log(myArray);
   // return rUrlRegex.match(url);


}*/

/*
var http = require('http');
var express = require('express');

var app = express();

app.get('/',function(req,res){
	console.log(req.headers.user-agent);
});

http.createServer(app).listen(3000,function(){
	console.log('a');
});
*/


/*
var request = require('request');
var cheerio = require('cheerio');

request({

	url:'hhttp://www.lottemart.com/category/categoryList.do?CategoryID=C001001100010001'
	//headers: {
       // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
    //}
}, function(err, res,html){
	console.log(html);
	if(err){
		//return next(err);
	}

	var $ = cheerio.load(html);
	//console.log($);
	var liList = $('a href');
	//console.log(liList);
});
*/
/*
var request = require('request');
var cheerio = require('cheerio');

request({
    url: 'http://www.lottemart.com/category/categoryList.do?CategoryID=C001001100010001',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
    }
}, function(err, res, html) {
    if (err) {
        console.log(err);
        return;
    }
    var $ = cheerio.load(html);
    var liList = $('a');


	for (var i = 0; i < liList.length; i++) {
        // productId�� �������� ����.
        var split = $(liList[i]).find('.pr_price .t_roman > span').attr('id').split('_');
        if (split.length < 2) {
            continue;
        }
        var productId = split[1];
        var price = $(liList[i]).find('#ItemCurrSalePrc_' + productId).text();
        price = price.replace(/,/gi, "");
        var title = $(liList[i]).find('#prodNm_' + productId).val();
        console.log(productId + ':' + title + '(' + price + ')');
    }

});

*/

var queue = require('./queue');
var request = require('request');
var cheerio = require('cheerio');
var Loopnext = require('loopnext');
var fs = require('fs');


var url = "http://www.naver.com";
var loop = new Loopnext();

var urlqueue = new queue(0); //urlqueue

urlqueue.push(url);

function attack(aurl){
  request ( aurl, function(err, res, html){

      if(!err){
        var $ = cheerio.load(html);
        var maxcount = $('a').length;
          console.log(maxcount);

        $("a").each(function(i,index){ // a �±� ����
          //var data = $(this);
          urlqueue.push($(this).attr("href"));

          //var temp = urlqueue.pop();
          //urlqueue.push(data.attr("href"));
          console.log(urlqueue.pop());
          attack(urlqueue.pop());


        });
      }
  });
}

attack(urlqueue.pop());
