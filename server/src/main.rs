use hello_world::render_client::RenderClient;
use hello_world::RenderRequest;
use hello_world::RenderReply;

use tonic::transport::Channel;

use std::io::prelude::*;
use std::net::TcpStream;
use std::net::TcpListener;

use actix_web::{get, web, App, Error, HttpRequest, HttpResponse, HttpServer, Responder};

pub mod hello_world {
    tonic::include_proto!("helloworld");
}

async fn handler(req: HttpRequest) -> Result<HttpResponse, Error> {
    let mut client = RenderClient::connect("http://[::1]:50051")
        .await
        .unwrap("GRPc: Connection error");

    let route_path = String::from(req.match_info().path());
    let request = tonic::Request::new(RenderRequest {
        path: route_path
    });

    let response = client.render(request)
        .await
        .unwrap("GRPc: Response error")
        .into_inner();

    Ok(HttpResponse::Ok().body(response.html))
}   

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().default_service(web::route().to(handler)))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}






// #[tokio::main]
// async fn main() -> Result<(), Box<dyn std::error::Error>> {

//     let listener = TcpListener::bind("0.0.0.0:3001").unwrap();
//     let mut client = RenderClient::connect("http://[::1]:50051").await?;

//     for stream in listener.incoming() {

//         println!("{}", "connected");
//         let stream = &mut stream.unwrap();

//         let mut buffer = [0; 512];
//         stream.read(&mut buffer).unwrap();

        // let request = tonic::Request::new(RenderRequest {});
        // let response = client.render(request).await?;
        // let html = response.into_inner().html;
        
//         let stream_response = format!("HTTP/1.1 200 OK\r\n\r\n{}", html);
//         stream.write(stream_response.as_bytes()).unwrap();
//         stream.flush().unwrap();
//     }

//     Ok(())
// }