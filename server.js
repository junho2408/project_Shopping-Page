let http = require('http'); // 웹 프로토콜에서 제공하는 기능을 받아오도록 하는 메소드
let url = require('url');

function start(route, handle){
    function onRequest(request, response){        
        let pathname = url.parse(request.url).pathname; // parse > 문자열을 캐치하는 메소드
        let queryData = url.parse(request.url, true).query; 
        
        route(pathname, handle, response, queryData.productId);
    }
    
    http.createServer(onRequest).listen(8888);
    // localhost:8888
}

exports.start = start; //내부의 함수를 외부에서 호출할 수 있도록 허용한다.