FROM rust:1.31

WORKDIR /app
COPY . .

RUN cargo install --path .

CMD ["reat-rust-ssr-server"]