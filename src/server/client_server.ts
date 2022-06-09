import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/index";

const PROTO_PATH = "../proto/index.proto";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_PATH)
);

const grpcObj = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

export const PORT = 8080;

export const client = new grpcObj.index.User(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);
console.log("client");
console.log(client);

const deadLine = new Date();

deadLine.setSeconds(deadLine.getSeconds() + 5);

client.waitForReady(deadLine, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

// const callLogin = () => {
//   client.Login({ name: "super Taesu", password: "secret" }, (err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(result);
//   });
// };
// export { callLogin };

function onClientReady() {
  client.Login({ name: "super Taesu", password: "secret" }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
}

const errorHandler = (err: any, result: any) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
};
