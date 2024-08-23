const mariadb = require('./database/connect/mariadb');

function main(response){
    console.log('main');

    mariadb.query("select * from product", function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
    response.write('Main page'); //응답의 바디 부분(표시할 내용)
    response.end();
}

function login(response){
    console.log('login');

    response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
    response.write('Login page'); //응답의 바디 부분(표시할 내용)
    response.end();
}

// function junho(response){
//     console.log('junho');

//     response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
//     response.write('Kim Junho'); //응답의 바디 부분(표시할 내용)
//     response.end();
// }

// function favicon(response){
//     response.writeHead(404, {'Content-Type': 'image/x-icon' });
//     response.end();
// }
// favicon.ico에 대한 request(웹 브라우저에서 자동으로 요구)가 없으면 router.js의 handle{}();메소드 부분에서 에러가 발생한다.
// 이를 해결하기 위해 해당 케이스의 요청에 대해 404오류 코드로 응답하도록 한다.

let handle = {}; // Dictionary > key:value 쌍으로 이루어진 변수
handle['/'] = main;
handle['/login'] = login;
// handle['/junho'] = junho;
//handle['/favicon.ico'] = favicon;

exports.handle = handle;