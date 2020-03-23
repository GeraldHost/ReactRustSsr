FROM ekidd/rust-musl-builder

ENV HOST=127.0.0.1
ENV PORT=8080
ENV GRPC_HOST=127.0.0.1
ENV GRPC_PORT=50051

COPY . .
RUN cargo build --release


ENTRYPOINT ["./target/x86_64-unknown-linux-musl/release/reatrustssrserver"]
