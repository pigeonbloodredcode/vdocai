package main

import (
	"border_patrol/database"
	"border_patrol/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()
	app := fiber.New(
		fiber.Config{
			BodyLimit: 524288000, //BodyLimit: 4 * 1024 * 1024,
			//Prefork:   true, // เหมือนใส่แล้ว log จะหายเลย
		},
	)

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		//AllowOrigins:     "https://gofiber.io, https://gofiber.net",
		AllowOrigins: "http://localhost:3000",
		//AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
		//AllowHeaders: "Origin, Content-Type, Accept, Accept-Language, Content-Length",
		AllowMethods: "POST, GET, OPTIONS, PUT, DELETE",
		//AllowCredentials: false,
		//BodyLimit:        4 * 1024 * 1024, // this is the default limit of 4MB
	}))

	routes.Setup(app)

	app.Listen(":8080")
}
