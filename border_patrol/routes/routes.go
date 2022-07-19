package routes

import (
	"border_patrol/controllers"

	"github.com/gofiber/fiber/v2"
)

var PassEmployee bool

const SecretKey = "secret"

func init() {
	// set permission
	PassEmployee = false

}

func Setup(app *fiber.App) {

	///general user
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/logout", controllers.Logout)

	///Admin
	// PassEmployee = true
	app.Get("/api/synemployee", controllers.SynEmployee)
	app.Get("/api/employees", controllers.Employees)
	app.Get("/api/edit-employee/:id?", controllers.EditEmployee)
	app.Put("/api/update-employee", controllers.UpdateEmployee)	
	app.Delete("/api/delete-employee/:id?", controllers.DeleteEmployee)
	app.Get("/api/admin-employee/:id?/:set?", controllers.AdminEmployee)
	app.Get("/api/lock-employee/:id?/:set?", controllers.LockEmployee)

	///Lesson
	app.Get(("/api/lessons"), controllers.Lesson)
	app.Get(("/api/view-lesson/:id?"), controllers.ViewLesson)
	app.Post(("/api/create-lesson"), controllers.CreateLesson)	
	app.Get(("/api/edit-lesson/:id?"), controllers.EditLesson)	
	app.Post(("/api/update-lesson"), controllers.UpdateLesson)	
	app.Delete(("/api/delete-lesson/:id?"), controllers.DeleteLesson)

	app.Get(("/api/view-lessons/:id?"), controllers.SynLessons)
}
