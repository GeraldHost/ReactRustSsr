FROM rust:1.40

RUN mkdir app

WORKDIR /app
COPY . .

RUN cargo install --path .

CMD ["reat-rust-ssr-server"]