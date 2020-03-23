#![allow(non_camel_case_types)]

use hello_world::render_client::RenderClient;
use hello_world::RenderRequest;

use actix_web::{web, App, Error, HttpRequest, HttpResponse, HttpServer};

pub mod hello_world {
    tonic::include_proto!("helloworld");
}

async fn handler(req: HttpRequest) -> Result<HttpResponse, Error> {
    let grpc_host = env!("GRPC_HOST");
    let grpc_port = env!("GRPC_PORT");
    let grpc_connect = format!("http://{}:{}", grpc_host, grpc_port);
    let mut client = RenderClient::connect(grpc_connect)
        .await
        .expect("GRPc: Connection error");

    let route_path = String::from(req.match_info().path());
    let request = tonic::Request::new(RenderRequest { path: route_path });

    let response = client
        .render(request)
        .await
        .expect("GRPc: Response error")
        .into_inner();

    Ok(HttpResponse::Ok().body(response.html))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let host = env!("HOST");
    let port = env!("PORT");
    let http_bind = format!("{}:{}", host, port);
    HttpServer::new(|| App::new().default_service(web::route().to(handler)))
        .bind(http_bind)?
        .run()
        .await
}
