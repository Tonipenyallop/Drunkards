#!/bin/bash

BASEDIR=$(dirname "$0")
echo $BASEDIR
cd ${BASEDIR}/

PROTO_DEST=./src/proto/out

mkdir -p ${PROTO_DEST}

npm run grpc_tools_node_protoc_ts \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DEST} \
    -I ./proto \
    proto/*.proto

# protoc --go_out=. --go_opt=paths=source_relative \
#     --go-grpc_out=${PROTO_DEST}
# cd ${BASEDIR}/drunkards-server
# protoc --go_out=. --go-grpc_out=. --proto_path=./proto \
    # ./proto/index.proto




# command to generate pb files : run it from proto
protoc --go_out=./out --go_opt=paths=source_relative \
    --go-grpc_out=./out --go-grpc_opt=paths=source_relative \
    index.proto