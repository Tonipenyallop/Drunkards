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

const PORT = 8882;
// tryna make it same as envoy port

const client = new grpcObj.index.User(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

// const deadLine = new Date();

// deadLine.setSeconds(deadLine.getSeconds());

// client.waitForReady(deadLine, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
onClientReady();
// });

function onClientReady() {
  client.Login(
    { username: "MUI GRANDE", password: "fromClient_server" },
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    }
  );
}

const errorHandler = (err: any, result: any) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
};

export default {
  client
};
