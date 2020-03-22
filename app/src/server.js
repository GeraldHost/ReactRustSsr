import * as fs from "fs";
import React from "react";
import * as path from "path";
import * as grpc from "grpc";
import Mustache from "mustache";
import ReactDOMServer from "react-dom/server";
import * as protoLoader from "@grpc/proto-loader";
import { StaticRouter } from "react-router-dom";

import App from "./App";

const PROTO_PATH = "proto/helloworld.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const helloProto = grpc.loadPackageDefinition(packageDefinition)
  .helloworld;

const renderHtml = ({ request }, callback) => {
  const templatePath =
    process.env.TEMPLATE_PATH ||
    path.join(__dirname, "template.html");
  const template = fs.readFileSync(templatePath, "utf8");
  console.log("request", request);
  const context = {};
  const innerHtml = ReactDOMServer.renderToString(
    <StaticRouter location={request.path} context={context}>
      <App />
    </StaticRouter>
  );

  const html = Mustache.render(template, { html: innerHtml });

  callback(null, { html });
};

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const main = () => {
  const server = new grpc.Server();
  server.addService(helloProto.Render.service, {
    render: renderHtml,
  });
  server.bind(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure()
  );
  server.start();
  console.log("Started GRPc server on port:50051 🚀");
};

main();
