package routes

import (
	"fmt"
    "github.com/gin-gonic/gin"
    "github.com/gorilla/websocket"
    "net/http"
    get_users "axidio.com/chat/controllers"
)

type Routes struct {
}

func (c Routes) StartGin() {
	r := gin.Default()
	api := r.Group("/api")
	{
        api.GET("/get-users", get_users.GetUsers)
        api.GET("/get-users-json", get_users.GetUsersFromJson)
		api.GET("/ws", func(c *gin.Context) {
			wshandler(c.Writer, c.Request)
		})
	}
	r.Run()
}

var wsupgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	wsupgrader.CheckOrigin = func(r *http.Request) bool { return true }
    conn, err := wsupgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println("Failed to set websocket upgrade: %+v", err)
        return
    }

    for {
        t, msg, err := conn.ReadMessage()
        if err != nil {
            break
        }
        conn.WriteMessage(t, msg)
    }
}