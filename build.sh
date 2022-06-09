#  Generate grpc file
./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=src/proto/ src/proto/*.proto




# Generate protocol buffer file


# Working except last line
protoc -I=. src/proto/*.proto \
  --js_out=import_style=commonjs:./ \
  --grpc-web_out=import_style=typescript,mode=grpcweb:./
 