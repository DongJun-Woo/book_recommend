const request = require('request');
const cheerio = require('cheerio');
let iconv = require('iconv-lite');

const url = 'http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=bgnb_mn&bid2=LiveRanking&bid3=main&bid4=001.html';

request({url : url,
		method: "GET",
		encoding: null}, (error, response, body)=>{
	const bodyDecoded = iconv.decode(body, "euc-kr");
    const $ = cheerio.load(bodyDecoded);

	$('.listItem.singleType').each((index,element) =>{
		let title = $(element).find('.itemName').text().trim();
		let writer = $(element).find('.itemMeta').text().trim();
		writer = writer.split(',').map((item)=> item.trim());


		/*let utf1 = iconv.decode(content, 'euc-kr');
		let utf2 = iconv.decode(content, 'euc-kr');*/
		console.log(title);
		console.log(writer);
		console.log();
	});
})