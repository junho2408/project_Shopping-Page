const fs = require('fs'); // FS : File Sink, html 파일을 가져오는 모듈
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html','utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response){
    mariadb.query("select * from product;", function(err, rows){
        console.log(rows);
    });
    response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
    response.write(main_view); //응답의 바디 부분(표시할 내용)
    response.end();
}

function diablo4(response){
    fs.readFile('./img/diablo_4.jpg', function(err,data){
        response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
        response.write(data); //응답의 바디 부분(표시할 내용)
        response.end();
    });    
}

function eldenRing(response){
    fs.readFile('./img/elden_ring.jpg', function(err,data){
        response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
        response.write(data); //응답의 바디 부분(표시할 내용)
        response.end();
    });    
}

function onceHuman(response){
    fs.readFile('./img/once_human.jpg', function(err,data){
        response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)
        response.write(data); //응답의 바디 부분(표시할 내용)
        response.end();
    });    
}

function order(response, productId){
    response.writeHead(200, {'Content-Type' : 'text/html'}); //응답의 헤드 부분(통신 상태, 응답의 유형)

    mariadb.query("insert into orderlist values("+ productId +", '" + new Date().toLocaleDateString() + "');", function(err, rows){});    
    response.write(main_view); //응답의 바디 부분(표시할 내용)
    response.write("<script>alert('Ordered Item No : "+productId + "');</script>");
    response.end();
}

function orderlist(response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(orderlist_view);

    mariadb.query("select * from orderlist;", function(err,rows){

        let remainQueryCounter = rows.length;

        if(remainQueryCounter == 0){
            response.write("</table>");
            response.end();
            return;
        }

        rows.forEach(element => {
            mariadb.query("select * from product where id = ?", [element.product_id], function(err2, rows2){
                rows2.forEach(element2 => {
                    response.write(
                    "<tr>"
                    + "<td>" + element2.id + "</td>"
                    + "<td>" + element2.name + "</td>"
                    + "<td>" + element2.description + "</td>"
                    + "<td>" + element2.price + "</td>"
                    + "<td>" + element.order_date + "</td>"
                    + "</tr>"
                    );
                });
                remainQueryCounter--;
        
                if(remainQueryCounter == 0){
                    response.write("</table>");
                    response.end();
                    return;
                }
            });            
        });
    });
}

function orderlist_empty(response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    mariadb.query("delete from orderlist;");
    response.write(orderlist_view);
    response.end();
}

// function favicon(response){
//     response.writeHead(404, {'Content-Type': 'image/x-icon' });
//     response.end();
// }
// favicon.ico에 대한 request(웹 브라우저에서 자동으로 요구)가 없으면 router.js의 handle{}();메소드 부분에서 에러가 발생한다.
// 이를 해결하기 위해 해당 케이스의 요청에 대해 404오류 코드로 응답하도록 한다.
//handle['/favicon.ico'] = favicon;

let handle = {}; // Dictionary > key:value 쌍으로 이루어진 변수
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle['/orderlist/empty'] = orderlist_empty;

/* image diirectory */
handle['/img/diablo_4.jpg'] = diablo4;
handle['/img/elden_ring.jpg'] = eldenRing;
handle['/img/once_human.jpg'] = onceHuman;

exports.handle = handle;