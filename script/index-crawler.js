const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getNews = () => {
    request(
    {
      url: "http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001",
      method: "GET",
      encoding: null,
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }
      if (response.statusCode === 200) {
        console.log("response ok");
        const bodyDecoded = iconv.decode(body, "euc-kr");
        const $ = cheerio.load(bodyDecoded);
        
        const img = $(
            ".coverImage > label > a"
        ).toArray();

        const list_text_inner_arr = $(
          ".rankBestContentList > ol > li > div"
        ).toArray();
  
        const result = [];
        list_text_inner_arr.forEach((div) => {
          const aFirst = $(div).find("a").first(); // 첫번째 <a> 태그
          const path = aFirst.attr("href"); // 첫번째 <a> 태그 url
          const url = `http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001${path}`; // 도메인을 붙인 url 주소
          const title = aFirst.text().trim();
            
          const img1 = $(div).find("img").first();
          const imgpath = img1.attr("src");
          const imgurl = `http://book.interpark.com/display/collectlist.do?_method=bestsellerHourNew&bookblockname=b_gnb&booklinkname=%BA%A3%BD%BA%C6%AE%C1%B8&bid1=w_bgnb&bid2=LiveRanking&bid3=main&bid4=001${path}`;
          const imgcon = img1.text().trim();
          
          const aLast = $(div).find("a").last(); // 두번째 <a>태그
          const author = aLast.text().trim();
          result.push({
            url,
            title,
            author,
            imgcon,
          });
        });
        console.log(result);
      }
    });
  };
  getNews();