import * as toni from "@grpc/proto-loader";
var PROTO_PATH = __dirname + "../proto/index.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH);
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var routeguide = protoDescriptor.routeguide;

const Server = grpc.Server();
