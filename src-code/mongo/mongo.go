package mongo

import (
	"context"
	"fmt"
	"time"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var ClientInstance *mongo.Client

func ConnectToMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://192.168.0.250:27017/"))
	if err != nil { panic(err) }
	ClientInstance = client

	client.Ping(ctx, readpref.Primary());

	fmt.Println("Successfully connected and pinged sadf.")
}