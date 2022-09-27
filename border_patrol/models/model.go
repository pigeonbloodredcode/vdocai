package models


type Employee struct {
	EmployeeID uint   `gorm:"primaryKey"`
	Name       string `gorm:"unique" json:"name"`
	City       string `json:"city"`
	Email      string `gorm:"unique" json:"email"`
	Status     bool   `json:"status"`
	Password   []byte `json:"password"` /// ต้องเซต json:"_

	Admin []Admin `gorm:"foreignKey:AdminID"`// ถ้าสร้างความสัมพันแบบนี้แล้ว จะสัมพันกับ id ให้เลย เช่น emp_id=8  admin=8 
	Score []Score `gorm:"foreignKey:ScoreID"`
}
type Role struct { /// ตัวนี้จะสร้างฐานข้อมูล Level general กับ  admin
	RoleID      uint    `gorm:"primaryKey"`
	Name        string  `json:"name"`
	Access_poin string  `json:"access_poin"`
	Admin       []Admin `gorm:"foreignKey:RoleID"`
}
type Score struct {
	ScoreID    uint `gorm:"primaryKey"`
	QuestionID uint //มีความสัมพันกับ  Question ดึงกลุ่มคำถามแล้วแสดงผลคะแนน ของแต่ละคน
	EmployeeID uint //มีความสัมพันกับ เจ้าหน้าที่ ดึงว่าคนในที่นี้ ทำมาคะแนนเท่าไร
}

type Admin struct {
	AdminID    uint   `gorm:"primaryKey"`
	Name       string `json:"Name"`
	EmployeeID uint  // เวลา add ต้องมี emp ก่อน
	RoleID     uint  //
}

type Lesson struct {
	LessonID uint   `gorm:"primaryKey"`
	Header   string `json:"header`
	Content  string `json:"content"`
	Status   bool   `json:"status"`

	Vdo             []Vdo             `gorm:"foreignKey:VdoID"`
	Lesson_Question []Lesson_Question `gorm:"foreignKey:LessonID"`
}
type Vdo struct {
	VdoID    uint   `gorm:"primaryKey"`
	Title    string `json:"title"`   //
	Src_dir  string `json:"src_dir"` //folder ID
	Director string `json:"director"`
	Status   bool   `json:"status"`
}
type Lesson_Question struct {
	Lesson_QuestionID uint `gorm:"primaryKey"`
	LessonID          uint
	//QuestionID        uint
	EmbedGoogle	  	  string
}

type Question struct {
	QuestionID  uint    `gorm:"primaryKey"`
	QuestionSet uint    //สำหรับบอกกลุ่มข้อสอบ
	Proposition string  `json:"namequestion"` //ชื่อกลุ่มคำถาม
	Score       []Score `gorm:"foreignKey:ScoreID;"`
	//Score                 	[]Score `gorm:"foreignKey:QuestionSet_score;references:NameQuestion_question;"`
}

type Question_Choose struct {
	Question_ChooseID uint   `gorm:"primaryKey"`
	Number            string `json:"number"`
	Name              string `json:"name"`
	Answer1           string `json:"answer1"`
	Answer2           string `json:"answer2"`
	Answer3           string `json:"answer3"`
	Answer4           string `json:"answer4"`
	TrueAnswer        string `json:"trueanswer"`

	Question []Question `gorm:"foreignKey:QuestionID;"`
	//Question []Question `gorm:"foreignKey:QuestionID;references:ID;"`
}













//import "gorm.io/gorm"

/*
CREATE TABLE `employees` (
	`id` bigint unsigned AUTO_INCREMENT,`created_at` datetime(3) NULL,`updated_at` datetime(3) NULL,`deleted_at` datetime(3) NULL,
	`name` varchar(191) UNIQUE,
	`city` longtext,
	`email` varchar(191) UNIQUE,
	`status` boolean,
	`password` longblob,
	PRIMARY KEY (`id`),INDEX `idx_employees_deleted_at` (`deleted_at`))
*/