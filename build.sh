#  Generate grpc file
./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=src/proto/ src/proto/*.proto




# Generate protocol buffer file


# from thomas(sort of working)
protoc -I=. src/proto/*.proto \
  --ts_out=import_style=commonjs:./ \
  # --grpc_web_out=./
#   import_style=commonjs:./src \
#   --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src
  # --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$OUT_DIR

# from github code
# protoc -I=. .src/proto/*.proto \
#   --js_out=import_style=commonjs:./src \
#   --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src

# mkdir -p ./src/proto/out
# protoc -I=. ./src/proto/*.proto \
#     --js_out=import_style=commonjs:./src/proto \
#     --grpc_web_out=import_style=typescript,mode=grpcwebtext:./src/proto
