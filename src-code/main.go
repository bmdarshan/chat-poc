package main

import (
	gin "axidio.com/chat/routes"
	mongo "axidio.com/chat/mongo"
	jwt "axidio.com/chat/jwt"
)

func main() {
	// jwt.VerifyToken()
	mongo.ConnectToMongo()
	var s gin.Routes
	s.StartGin()
}