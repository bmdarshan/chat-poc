package jwt

import (
	// "time"
	"fmt"
	"reflect"

	"github.com/gbrlsnchs/jwt/v3"
)

type CustomPayload struct {
	jwt.Payload
	Foo string `json:"foo,omitempty"`
	Bar int    `json:"bar,omitempty"`
}


// func SignToken() {
// 	var hs = jwt.NewHS256([]byte("secrt"))
// 	now := time.Now()
// 	pl := CustomPayload{
// 		Payload: jwt.Payload{
// 			Issuer:         "gbrlsnchs",
// 			Subject:        "someone",
// 			Audience:       jwt.Audience{"https://golang.org", "https://jwt.io"},
// 			ExpirationTime: jwt.NumericDate(now.Add(24 * 30 * 12 * time.Hour)),
// 			NotBefore:      jwt.NumericDate(now.Add(30 * time.Minute)),
// 			IssuedAt:       jwt.NumericDate(now),
// 			JWTID:          "foobar",
// 		},
// 		Foo: "foo",
// 		Bar: 1337,
// 	}

// 	token, err := jwt.Sign(pl, hs)
// 	if err != nil {
// 		println(error)
// 	}
// 	fmt.Printf(string(token))
// 	// ...
// }


func VerifyToken () {
	var hs = jwt.NewHS256([]byte("secrt"))
	myToken := []byte("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnYnJsc25jaHMiLCJzdWIiOiJzb21lb25lIiwiYXVkIjpbImh0dHBzOi8vZ29sYW5nLm9yZyIsImh0dHBzOi8vand0LmlvIl0sImV4cCI6MTY0Njc0MzA3MCwibmJmIjoxNjE1NjQwODcwLCJpYXQiOjE2MTU2MzkwNzAsImp0aSI6ImZvb2JhciIsImZvbyI6ImZvbyIsImJhciI6MTMzN30.GYxooIMYVREQ5WtkAClAyz9QupAarJV7GTWZ6S_w0oQ")
	var pl CustomPayload
	hd, err := jwt.Verify(myToken, hs, &pl)
	if err != nil {
		fmt.Printf("failed to generate new RSA privatre key: %s\n", err)
		return
	}
	fmt.Printf("success")
	fmt.Printf(reflect.TypeOf(hd).String())

}
