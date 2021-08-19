package controllers

import (
	"context"
	mongo "axidio.com/chat/mongo"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	model_user "axidio.com/chat/models"
)

func GetUsers(c *gin.Context) {
	db := mongo.ClientInstance
	filter := bson.D{{"username", "bmdarshan"}}
	result := model_user.User{}
	err := db.Database("cvs").Collection("users").FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		c.JSON(200, gin.H{
			"message": "Error Get All User",
		})
		return
	}

	c.JSON(200, gin.H{
		"user": &result,
	})
}

func GetUsersFromJson(c *gin.Context) {
	db := mongo.ClientInstance
	filter := bson.D{{"username", "bmdarshan"}}
	var result map[string]interface{}
	err := db.Database("cvs").Collection("users").FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		c.JSON(200, gin.H{
			"message": "Error Get All User",
		})
		return
	}

	c.JSON(200, gin.H{
		"user": &result,
	})
}