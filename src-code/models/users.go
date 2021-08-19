package model


//User
type User struct {
	Username  string    `bson:"username"`
	Firstname string 	`bson:"firstName"`
}


//Users
type Users []User