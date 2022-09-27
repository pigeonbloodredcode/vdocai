package database

import (
	"border_patrol/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	//dns := "root:R00t@localhost@/border_patrol"
	dns := "root:Password123#@!@tcp(localhost:3306)/border_patrol"
	connection, err := gorm.Open(mysql.Open(dns), &gorm.Config{})

	if err != nil {
		panic("could  not connect to the database")
	}

	DB = connection
	connection.AutoMigrate(
		&models.Question_Choose{},
		&models.Question{},
		&models.Employee{},
		&models.Role{},
		&models.Admin{},
		&models.Score{},

		&models.Lesson{},
		&models.Vdo{},
		&models.Lesson_Question{},

		//ให้ทำ 8 ตัวก่อน ค่อยมารันตัวที่ 9 ทีหลัง
	)

	
	R1 := models.Role{
		Name:        "all",
		Access_poin: "all",
	}
	DB.Where("role_id = ?", 1).First(&R1)
	if R1.RoleID == 0 {
	//First Data
		var R = []models.Role{
			{Name: "all", Access_poin: "all"},
			{Name: "viewer", Access_poin: "viewer"},
		}
		DB.Create(&R)


		password1, _ := bcrypt.GenerateFromPassword([]byte("money"), 14)
		FirstUser := models.Employee{
			Name:     "money",
			Email:    "money@money.money",
			City:     "money",
			Password: password1,
			Status:   true,
			Admin: []models.Admin{
				{
					Name:       "admin",
					RoleID:     2,
					EmployeeID: 1,
				},
			},
		}
		DB.Create(&FirstUser)

	}
}
