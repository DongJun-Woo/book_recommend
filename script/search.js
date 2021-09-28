const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let iconv = require('iconv-lite');

const url = 'http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=bgnb_mn&bid2=LiveRanking&bid3=main&bid4=001.html';

let tit_wrt; //제목과 저자를 담을 변수

//euc-kr -> utf-8로 변환
request({url : url,
		method: "GET",
		encoding: null}, (error, response, body)=>{
	const bodyDecoded = iconv.decode(body, "euc-kr");
    const $ = cheerio.load(bodyDecoded);


    let i = 0; //처음 시작 부분을 구분하기 위한 변수
    		   //처음부터 문자열을 더하면 undefined가 나와서 구분함
    		   //혹시 갯수도 필요할까봐 계속 하나씩 더함

	$('.listItem.singleType').each((index,element) =>{
		if(i == 0){
			tit_wrt = $(element).find('.itemName').text().trim() + '||' //띄어쓰기론 구분이 되지않아 '||' 로 결정
			+ $(element).find('.itemMeta .author').text().trim() + '\n';
			
			i++;
		}
		else {
			tit_wrt = tit_wrt + $(element).find('.itemName').text().trim() + '||'//문자열을 다 더한다
			+ $(element).find('.itemMeta .author').text().trim() + '\n';

			i++;
		}
	});

	//다 더한 문자열을 한꺼번에 텍스트파일에 쓴다
	fs.writeFileSync("title&writer.txt", '\ufeff' + tit_wrt, 
			{encoding: 'utf-8'});
});