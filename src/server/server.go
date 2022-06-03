package server

import (
	"fmt"
	"net"
	// "context"
	"google.golang.org/grpc"

	pb "github.com/Tonipenyallop/drunkards_second/src/proto"
)

type LoginServer struct {
	// pb.UnimplementedUserServer
}

const (
	CONN_PORT = "9999"
)

// func (s *LoginServer) Login(ctx context.Context, userInfo *pb.userInfo) (*pb.SuccessLogin, error) {

// 	fmt.Println("ctx")
// 	fmt.Println(ctx)
// 	fmt.Println("userInfo")
// 	fmt.Println(userInfo)
// 	// fmt.Fprintf(w, "login")
// 	return &pb.SuccessLogIn{IsSuccess: true}, nil
// }

func newServer() *LoginServer {
	s := &LoginServer{}
	return s
}

func main(){

	lis, err := net.Listen("tcp", "localhost:" + CONN_PORT)
	if err != nil {
		fmt.Printf("Failed to Open tcp port" + CONN_PORT)
	}

	grpcServer := grpc.NewServer()

	// pb.RegisterUserServer(grpcServer, newServer())
	fmt.Println("Listening PORT with" + CONN_PORT)
	if err := grpcServer.Serve(lis); err != nil {
		fmt.Printf("Error occurred: %v", err)
	}

}

