package controllers

import (
	"border_patrol/database"
	"border_patrol/models"
	"bufio"
	"io"
	"log"
	"os"
	"strings"

	"fmt"

	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"

	_ "encoding/json"

	"golang.org/x/crypto/bcrypt"
	//dJson := `{"some":"json"}`		//json.Unmarshal([]byte(dJson), &myStoredVariable)
)

const SecretKey = "secret"

var EmpID = ""

var Level = ""

func init() {

}

// / syn and check jwt cookie found decode is ID and syn DB found  return empolyee data jason
func SynEmployee(c *fiber.Ctx) error {
	// pass := SynCookie(c)
	// if( pass != "admin" || pass == "viewer" ){
	// 	return c.JSON(fiber.Map{"message": "unauthenticated",})
	// 	// message admin
	// 	// message viewer
	// }
	Level = "viewer"

	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	EmpID = claims.Issuer

	type EAR struct {
		EmployeeID  string `json:"employee_id"`
		Name        string `json:"name"`
		City        string `json:"city"`
		Email       string `json:"email"`
		Status      string `json:"status"`
		Role        string `json:"role"`
		Access_poin string `json:"access_poin"`
	}
	var ear EAR

	rows, err := database.DB.Table("employees").
		Select("employees.employee_id, employees.name, employees.city, employees.email,  roles.name, roles.access_poin ").
		Joins("JOIN admins on admins.admin_id = employees.employee_id").
		Joins("JOIN roles on  roles.role_id = admins.role_id").Where("employees.employee_id", claims.Issuer).Rows()

	for rows.Next() {
		rows.Scan(&ear.EmployeeID, &ear.Name, &ear.City, &ear.Email, &ear.Role, &ear.Access_poin)
		fmt.Println("EAR:", ear.EmployeeID, ear.Name, ear.City, ear.Email, ear.Role, ear.Access_poin) //fmt.Println(&ear.EmployeeID, &ear.Name, &ear.City, &ear.Email, &ear.Password, &ear.Role, &ear.Access_poin)

	}
	if ear.EmployeeID == "" {
		return c.JSON(fiber.Map{"message": " not found user"})
	} else {
		fmt.Println("ear.EmployeeID 0 Err=", err)
	}

	return c.JSON(ear) //return c.JSON(employee)
}

// var DB *gorm.DB
func Register(c *fiber.Ctx) error {
	if Level != "" {
	}

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 8)
	emp := models.Employee{
		Name:     data["name"],
		Email:    data["email"],
		City:     data["city"],
		Password: password,
		Status:   true,
		Admin: []models.Admin{
			{
				Name:   "viewer",
				RoleID: 2,
			},
		},
	}
	database.DB.Create(&emp)
	return c.JSON(emp)
}

// /// if Process responce message ( login:employeeJSON  or unlogin )
func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var emp models.Employee //var admin models.Admin

	database.DB.Where("status = 1 AND  email = ?", data["email"]).First(&emp)
	database.DB.First(&emp)

	if err := bcrypt.CompareHashAndPassword(emp.Password, []byte(data["password"])); err != nil {
		fmt.Println("bcrypt ", err.Error())
		//c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "unlogin",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: strconv.Itoa(int(emp.EmployeeID)),
		//ExpiresAt: jwt.NewTime().Add(time.Hour*24).Unix() ,//time.Now().Add(time.Hour * 24).Unix(),// 1day		'365d'
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			//"message": "could not login ",
			"message": "unlogin",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	fmt.Println(emp.Email, emp.EmployeeID)
	if emp.EmployeeID == 0 || emp.Email == "" { //c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{ //"message": "user not found",
			"message": "unlogin",
		})
	} else {
		return c.JSON(fiber.Map{
			"message": "login",
		})
	}
}
func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	fmt.Println("Logout  see you soon")

	return c.JSON(fiber.Map{"message": "logout"})
}

func Employees(c *fiber.Ctx) error {
	// var emp []models.Employee
	// database.DB.Select(
	// 	" employees.employee_id  ,employees.name as name ,employees.email as email ," +
	// 		" employees.city as city , admins.name as Admin").
	// 	Joins(" JOIN admins  	on admins.employee_id 	= employees.employee_id ").
	// 	Joins(" JOIN roles   	on roles.role_id 		= admins.role_id ").Find(&emp)
	// fmt.Println(" อย่าลืม ตรวจสอบว่า พวกนี้ ระดับไหนแล้วใส่ permiession claimsIduser", c.JSON(emp))

	type employee struct {
		EmployeeID string `json:"employee_id"`
		Name       string `json:"name"`
		Email      string `json:"email"`
		City       string `json:"city"`
		Role       string `json:"role"`
		Status     string `json:"status"`
	}
	e := []employee{}
	database.DB.Select(
		" employees.employee_id as employee_id ,employees.name as name ,employees.email as email ," +
			" employees.city as city, employees.status as status , admins.name as role").
		Joins(" JOIN admins  	on admins.admin_id 	= employees.employee_id ").
		Joins(" JOIN roles   	on roles.role_id 	= admins.role_id ").Find(&e)

	fmt.Println(" อย่าลืม ตรวจสอบว่า พวกนี้ ระดับไหนแล้วใส่ permiession claimsIduser", c.JSON(e))

	return c.JSON(e)
}

func EditEmployee(c *fiber.Ctx) error {
	// cookie := c.Cookies("jwt")
	// token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
	// 	return []byte(SecretKey), nil
	// })

	// if err != nil {
	// 	c.Status(fiber.StatusUnauthorized)
	// 	return c.JSON(fiber.Map{
	// 		"message": "unauthenticated",
	// 	})
	// }
	// claims := token.Claims.(*jwt.StandardClaims)
	//var data map[string]string
	// if err := c.BodyParser(&data); err != nil {
	// 	return err
	// }
	if c.Params("id") == "" {
		//return c.SendString("Hello " + c.Params("id"))
		return c.SendString(":INPUTID ")
		// => Hello john
	}
	id := c.Params("id")
	var employee models.Employee
	database.DB.Where("employee_id = ?", id).First(&employee)

	return c.JSON(employee)

}
func DeleteEmployee(c *fiber.Ctx) error {
	if c.Params("id") == "" { //return c.SendString("Hello " + c.Params("id"))// => Hello john
		return c.SendString(":INPUTID ")
	}
	id := c.Params("id")
	var employee models.Employee
	var admin models.Admin

	database.DB.First(&admin, id)
	database.DB.Delete(&admin)
	database.DB.First(&employee, id)
	database.DB.Delete(&employee)
	//database.DB.Model(&employee).Association("Admin").Delete(&admin)
	database.DB.First(&employee, id)

	if employee.EmployeeID == 0 {
		fmt.Println("DELETE Admin and Emplooyee by id", employee.EmployeeID)
		return c.JSON("deleteemployee")
	} else {
		fmt.Println("UNDELETE Admin and Emplooyee by id", employee.EmployeeID)
		return c.JSON("undeleteemployee")

	}
}

func UpdateEmployee(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	fmt.Println("UpdateEmployee", data)
	var emp models.Employee
	if data["password"] != "" {
		password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 8)
		database.DB.Model(&emp).Where("employee_id = ?", data["id"]).Updates(map[string]interface{}{"name": data["name"], "email": data["email"], "city": data["city"], "password": password})
	}

	database.DB.Model(&emp).Where("employee_id = ?", data["id"]).Updates(map[string]interface{}{"name": data["name"], "email": data["email"], "city": data["city"]})
	return c.Status(200).JSON(emp)
}

func AdminEmployee(c *fiber.Ctx) error {
	if c.Params("id") == "" || c.Params("set") == "" {
		return c.SendString(":INPUTID ")
	}
	id := c.Params("id")
	set := c.Params("set")

	var empAdmin models.Admin
	//set  viewer and admin
	if set == "toadmin" { //fmt.Println("ViewerEmployee", id, ", emp ", empAdmin.RoleID) //empAdmin.Name = "viewer";empAdmin.RoleID = 2;database.DB.Save(&empAdmin);
		database.DB.Model(&empAdmin).Where("admin_id = ?", id).Update("role_id", 1).Update("name", "admin")
		fmt.Println("message", "toadmin")
		return c.JSON(fiber.Map{"message": "toadmin"})
	} else if set == "toviewer" { //fmt.Println("AdminEmployee", id, ", emp ", empAdmin.RoleID)//empAdmin.Name = "admin";empAdmin.RoleID = 1;database.DB.Save(&empAdmin);
		database.DB.Model(&empAdmin).Where("admin_id = ?", id).Update("role_id", 2).Update("name", "viewer")
		fmt.Println("message", "toviewer")
		return c.JSON(fiber.Map{"message": "toviewer"})

	}

	return c.JSON(fiber.Map{"message": " not found user"})

}
func LockEmployee(c *fiber.Ctx) error {
	if c.Params("id") == "" || c.Params("set") == "" {
		return c.SendString(":INPUTID ")
	}
	fmt.Println("LockEmployee")
	id := c.Params("id")
	set := c.Params("set")

	var emp models.Employee
	//set  Lock and Unlock
	if set == "tolock" {
		database.DB.Model(&emp).Where("employee_id = ?", id).Update("status", 0)

	} else if set == "tounlock" {
		database.DB.Model(&emp).Where("employee_id = ?", id).Update("status", 1)

	}
	//return c.JSON(emp)
	return c.Status(200).JSON("LockEmployee_true")
	//return c.JSON(fiber.Map{"message": "LockEmployee_true"})
}

func SynLessons(c *fiber.Ctx) error {
	fmt.Println("SynLessons")
	type LESSON struct {
		Lesson_id    string `json:"lesson_id"`
		Header       string `json:"header"`
		Content      string `json:"content"`
		Status       string `json:"status"`
		Src_dir      string `json:"src_dir"`
		Embed_google string `json:"embed_google"`
	}
	var lesson []LESSON
	//var lesson []models.Lesson
	id := c.Params("id")
	fmt.Println(id, "Lesson")
	database.DB.Select(
		"lessons.lesson_id as lesson_id , lessons.header as header, lessons.content as content , lessons.status as status, " +
									"vdos.src_dir as src_dir, lesson_questions.embed_google as embed_google").
		Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id"). //Find(&lesson)
		Joins("JOIN lesson_questions on  lesson_questions.lesson_id = lessons.lesson_id").Find(&lesson)
	return c.JSON(lesson)
}
func Lesson(c *fiber.Ctx) error {
	var lesson []models.Lesson
	database.DB.Select("*").Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id").Find(&lesson)
	fmt.Println(lesson)
	return c.JSON(lesson) //return c.JSON(employee)
}

func ViewLesson(c *fiber.Ctx) error {
	fmt.Println("ViewLesson")
	if c.Params("id") == "" {
		return c.JSON(fiber.Map{"message": "id not found"})
	}
	id := c.Params("id")

	type LESSONVDO struct {
		Lesson_id string `json:"lesson_id"`
		Header    string `json:"header"`
		Content   string `json:"content"`
		Src_dir   string `json:"src_dir"`
		Status    string `json:"status"`
		Title     string `json:"title"`
		Director  string `json:"director"`
	}

	var lv LESSONVDO
	//rows, err := database.DB.Table("lessons").Select("lessons.lesson_id as lesson_id, lessons.header as header, "+"lessons.content as content, 	 lessons.status as status, "+"vdos.title as title, 			 vdos.src_dir   as src_dir,"+"vdos.director  as director, lesson_questions.embed_google as embed_google ").Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id").Joins("JOIN lesson_questions on  lesson_questions.lesson_id = lessons.lesson_id").Where("lessons.lesson_id", id).Rows()//if err := rows.Err(); err != nil {panic(err);}
	var l models.Lesson
	database.DB.Model(&l).
		Select("lessons.lesson_id as lesson_id, lessons.header as header, "+
			"lessons.content as content, 	 lessons.status as status, "+
			"vdos.title as title, 			 vdos.src_dir   as src_dir,"+
			"vdos.director  as director, lesson_questions.embed_google as embed_google ").
		Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id").
		Joins("JOIN lesson_questions ON  lesson_questions.lesson_id = lessons.lesson_id").
		Where("lessons.lesson_id", id).Scan(&lv)

	if lv.Lesson_id == "" {
		return c.JSON(fiber.Map{"message": " not found user"})
	}
	return c.JSON(lv)
}

func CreateLesson(c *fiber.Ctx) error {
	// frm, err := c.Context().MultipartForm()
	// fmt.Println("CreateVDOLesson")
	// fmt.Println("Contnt_type", c.Get("Content-Type"))
	// fmt.Println("Contnt_type ", frm, "err ", err)
	// fmt.Println("Method ", c.Method())

	header := c.FormValue("header")
	content := c.FormValue("setContent") //content 	:= c.FormValue("content")
	embedG := c.FormValue("embedG")
	fmt.Println("Method header", header, content)

	lesson := models.Lesson{
		Header:  header,
		Content: content,
		Status:  true,
	}

	database.DB.Create(&lesson)

	fileFormFile, errFormFile := c.FormFile("formData")
	if errFormFile != nil {
		fmt.Println("file upload error -->", errFormFile.Error(), "-->", fileFormFile)
		return c.JSON(fiber.Map{"status": 500, "message": "server upload file"})
	}
	var id string = strconv.FormatUint(uint64(lesson.LessonID), 10)
	//saveDir := fmt.Sprintf("./uploads/%s.mp4", id)
	saveDir := fmt.Sprintf("/home/redcode/Desktop/src/vdocai/react-auth/public/uploads/%s.mp4", id)

	savefileErr := c.SaveFile(fileFormFile, saveDir)
	if savefileErr == nil {
		vdo := models.Vdo{
			VdoID:    lesson.LessonID,
			Title:    header,
			Src_dir:  saveDir,
			Director: EmpID,
			Status:   true,
		}
		database.DB.Create(&vdo)
		fmt.Println("err ", savefileErr)
		fmt.Println("Saveing")
	}

	lq := models.Lesson_Question{
		LessonID:    lesson.LessonID,
		EmbedGoogle: embedG,
	}

	database.DB.Create(&lq)

	//1FAIpQLSezra08VMfz8VzFhfsVdZKSH5i2E6cV9fD4VdV95jCWE5aV2A  EMBED GOOGLE
	c.Redirect("http://localhost:3000/add-lesson")
	return c.JSON((fiber.Map{"message": "addVDOLesson"}))
}

func EditLesson(c *fiber.Ctx) error {
	fmt.Println("EditLesson...")
	if c.Params("id") == "" {
		//return c.SendString("Hello " + c.Params("id"))
		return c.SendString(":INPUTID ")
		// => Hello john
	}
	id := c.Params("id")
	var lesson models.Lesson
	database.DB.Where("lesson_id = ?", id).First(&lesson)

	return c.JSON(lesson)
}

func UpdateLesson(c *fiber.Ctx) error {
	// check fromdata if empty   DO IT
	// type LESSONVDO struct {
	// 	Lesson_id string `json:"lesson_id"`
	// 	Header    string `json:"header"`
	// 	Content   string `json:"content"`
	// 	Src_dir   string `json:"src_dir"`
	// 	Status    string `json:"status"`
	// 	Title     string `json:"title"`
	// 	Director  string `json:"director"`
	// }
	// var lv LESSONVDO
	// rows, err := database.DB.Table("lessons").
	// 	Select(
	// 		"lessons.lesson_id as lesson_id, lessons.header as header, "+
	// 			"lessons.content as content, 	 lessons.status as status, "+
	// 			"vdos.title as title, 			 vdos.src_dir   as src_dir,"+
	// 			"vdos.director  as director").
	// 	Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id").
	// 	Where("lesson_id", id).Rows()
	// if err != nil {
	// 	fmt.Println("Err:", err)
	// }
	// for rows.Next() {
	// 	rows.Scan(&lv.Lesson_id, &lv.Header, &lv.Content, &lv.Status, &lv.Title, &lv.Src_dir, &lv.Director)
	// }

	fmt.Println("UpdateLesson")
	// frm, err := c.Context().MultipartForm()
	// fmt.Println("CreateVDOLesson")
	// fmt.Println("Contnt_type", c.Get("Content-Type"))
	// fmt.Println("Contnt_type ", frm, "err ", err)
	// fmt.Println("Method ", c.Method())

	getId := c.FormValue("id")
	getHeader := c.FormValue("header")
	getContent := c.FormValue("setContent")

	if err := database.DB.Model(models.Lesson{}).Where("lesson_id", getId).
		Updates(models.Lesson{Header: getHeader, Content: getContent}).Error; err != nil {
		fmt.Println("Err ", err)
	}

	fileFormFile, errFormFile := c.FormFile("formData")
	if errFormFile != nil {
		fmt.Println("file upload error -->", errFormFile.Error(), "-->", fileFormFile)
		c.Redirect("http://localhost:3000/update-lesson")
		return c.JSON(fiber.Map{"status": 500, "message": "server upload file"})
	}
	saveDir := fmt.Sprintf("/home/redcode/Desktop/src/vdocai/react-auth/public/uploads/%s.mp4", getId)
	fmt.Println("File save ", saveDir)

	savefileErr := c.SaveFile(fileFormFile, saveDir)
	if savefileErr == nil {
		fmt.Println("File Update ")
	}

	if err := database.DB.Model(models.Vdo{}).Where("vdo_id", getId).
		Updates(models.Vdo{Title: getHeader, Src_dir: saveDir}).Error; err != nil {
		fmt.Println("Err ", err)
	}

	//return c.JSON("updatelesson")

	c.Redirect("http://localhost:3000/update-lesson")
	return c.JSON((fiber.Map{"message": "UpdateVDOLesson"}))
}

func DeleteLesson(c *fiber.Ctx) error {
	fmt.Println("DeleteLesson...")
	if c.Params("id") == "" {
		//return c.SendString("Hello " + c.Params("id"))
		return c.SendString(":INPUTID ")
		// => Hello john
	}
	id := c.Params("id")
	var vdo models.Vdo //var lq models.Lesson_Question
	var l models.Lesson
	var lq models.Lesson_Question
	//deleteFile := fmt.Sprintf("./uploads/%s.mp4", id)
	deleteFile := fmt.Sprintf("/home/redcode/Desktop/src/vdocai/react-auth/public/uploads/%s.mp4", id)
	f, err := os.Stat(deleteFile)
	//fmt.Println("File :", deleteFile, " to Found", f)
	if err == nil {
		fmt.Println("Err== nill File :", deleteFile, " to Found", f)
		err := os.Remove(deleteFile)
		if err != nil {
			fmt.Println("Error Not Remove File")
		}
		fmt.Println("File :", deleteFile, " to Delete")
		tx := database.DB.Begin()

		tx.First(&l, id)
		tx.Delete(&l)

		tx.First(&vdo, id)
		tx.Delete(&vdo)

		tx.First(&lq, id)
		tx.Delete(&lq)

		if err := tx.Error; err != nil {
			fmt.Println("DELETE Error ", err)
			tx.Rollback()
			//return c.JSON(fiber.Map{"message": "undeletelesson"})
		} else {
			fmt.Println("DELETE Success ")
			tx.Commit()
			return c.JSON(fiber.Map{"message": "deletelesson"})
		}

	}
	///ลบไฟล์ วิดีโอด้วย	fmt.Println("DELETE vdo lesson by id", id) //database.DB.Model(&employee).Association("Admin").Delete(&admin)

	return c.JSON(fiber.Map{"message": "undeletelesson"})
}

// create file input  and Add varible start to file name lession_id
func IStarLesson(c *fiber.Ctx) error {
	if c.Params("id") == "" || c.Params("num") == "" {
		return c.JSON(fiber.Map{"message": "INPUT NULL Star"})
	}
	var id = c.Params("id")

	num, err := strconv.Atoi(c.Params("num"))
	if err != nil {
		log.Fatal(err)
	}

	/////fi open input file and close  on exit and check for its returned error 	/* Real Pathfi, err := os.Open("/home/redcode/Desktop/src/vdocai/border_patrol/uploads/input.txt",os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)*/
	fi, err := os.OpenFile("uploads/"+id+".txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("os.OpenFile", err)
	}
	defer func() {
		if err := fi.Close(); err != nil {
			fmt.Println("fi.Close", err)
		}
	}()
	/////fi open input file and close

	/////f open read write close
	f, err := os.Open("uploads/" + id + ".txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	scanner.Split(bufio.ScanWords)
	count := 0
	var s []string
	for scanner.Scan() {
		s = append(s, scanner.Text())
		count++
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%d\n", count)
	addValue, err := strconv.Atoi(strings.Join(s, ""))
	addValue = addValue + num
	fmt.Println(" infile", addValue, " <<  ", num)

	/// write
	ff, err := os.OpenFile("uploads/"+id+".txt", os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("os.OpenFile", err)
	}
	defer func() {
		if err := ff.Close(); err != nil {
			fmt.Println("fi.Close", err)
		}
	}()

	_, err2 := ff.WriteString(strconv.Itoa(addValue))
	if err2 != nil {
		log.Fatal(err2.Error())
		fmt.Println(err2)
	}
	fmt.Println(" เพิ่มดาว เสร็จ")

	return c.JSON(fiber.Map{"message": "Add Star"})
}

func ReadByWord(c *fiber.Ctx) error {
	/////f open read write close
	f, err := os.Open("uploads/" + "id" + ".txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	scanner.Split(bufio.ScanWords)
	count := 0
	var s []string
	for scanner.Scan() {
		s = append(s, scanner.Text())
		count++
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%d\n", count)
	return c.JSON(fiber.Map{"message": "Read Star"})
}

func ReadByByte(filename string, size uint8) {
	file, err := os.Open(filename)
	if err != nil {
		fmt.Println(err.Error())
	}
	defer file.Close()
	buf := make([]byte, size)
	for {
		totalRead, err := file.Read(buf)
		if err != nil {
			if err != io.EOF {
				fmt.Println(err.Error())
			}
			break
		}
		fmt.Println(string(buf[:totalRead]))
	}
}

// type LESSONVDOQUESTION struct {
// 	Lesson_id 			string `json:"lesson_id"`
// 	Header    			string `json:"header"`
// 	Content   			string `json:"content"`
// 	Src_dir   			string `json:"src_dir"`
// 	Status    			string `json:"status"`
// 	Embed_google    	string `json:"embed_google"`
// }
// var lvq []LESSONVDOQUESTION
// rows, err := database.DB.Table("lessons").
// Select("*").
// Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id").
// Joins("JOIN lesson_questions on  lesson_questions.lesson_id = lessons.lesson_ids").Rows()
// if err != nil {fmt.Println("Err:", err);}
//  for rows.Next() {
// 	rows.Scan(lvq)
// 	rows.Scan(&lvq.Lesson_id, &lvq.Header, &lvq.Content, &lvq.Status, &lvq.Embed_google, &lvq.Src_dir);
// 	fmt.Println( lvq.Lesson_id,  lvq.Header,  lvq.Content,  lvq.Status,  lvq.Embed_google,  lvq.Src_dir);
//  }
// return c.JSON(rows);

// func main() {
//     db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/dbname")
//     if err != nil {
//         panic(err)
//     } else if err = db.Ping(); err != nil {
//         panic(err)
//     }
//     defer db.Close()

//     _, err := db.Exec("CREATE TABLE IF NOT EXISTS mytable (id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, some_text TEXT NOT NULL)")
//     if err != nil {
//         panic(err)
//     }

//     // Create
//     res, err := db.Exec("INSERT INTO mytable (some_text) VALUES (?)", "hello world")
//     if err != nil {
//         panic(err)
//     }

//     // get the id of the newly inserted record
//     id, err := res.LastInsertId()
//     if err != nil {
//         panic(err)
//     }

//     // Read
//     var someText string
//     row := db.QueryRow("SELECT some_text FROM mytable WHERE id = ? LIMIT 1", id)
//     if err := row.Scan(&someText); err != nil {
//         panic(err)
//     }
//     fmt.Println(someText)

//     // Update
//     _, err = db.Exec("UPDATE mytable SET some_text = ? WHERE id = ?", "Hello, 世界", id)
//     if err != nil {
//         panic(err)
//     }

//     // Delete
//     _, err = db.Exec("DELETE FROM mytable WHERE id = ?", id)
//     if err != nil {
//         panic(err)
//     }
// }
// users := make([]*User, 0)
// rows, err := db1.Query("SELECT  user_id, subject,phone, body FROM users limit 11")
// if err != nil {
//     log.Fatal(err)
// }
// defer rows.Close()

// for rows.Next() {
//     user := new(User)
//     if err := rows.Scan(&user.ID, &user.Subject, &user.Phone, &user.Body); err != nil {
//         panic(err)
//     }
//     users = append(users, user)
// }
// if err := rows.Err(); err != nil {
//     panic(err)
// }

// func ViewVdoLesson(c *fiber.Ctx) error {
// 	id := c.Params("id")
// 	id = "1"
// 	path := fmt.Sprintf("./uploads/%s.mp4", id)
// 	 test
// 	fmt.Print(path)
// 	f, err := os.Open(path)
// 	if err != nil{
// 		fmt.Println(err.Error())
// 	}
// 	defer f.Close()
// 	stats, err := f.Stat()
// 	if err != nil{
// 		fmt.Println(err.Error())
// 	}
// 	fmt.Printf("File Name: %s\n" , stats.Name())
// 	fmt.Printf("Time Modified: %s\n" , stats.ModTime().Format("15:04:03"))
// 	contents , err := ioutil.ReadFile(path)
// 	if err != nil{
// 		fmt.Println(err.Error())
// 	}
// 	fmt.Println(string (contents))
// 	/ Read By Line

// 	f, err := os.Open(path)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 	}
// 	defer f.Close()
// 	scanner:= bufio.NewScanner(f)
// 	for scanner.Scan(){
// 		//fmt.Print(scanner.Text())
// 	}
// 	//
// 	ReadByWord(path)
// 	ReadByByte(path, 8)

// 	return c.JSON(fiber.Map{"": path})
// }
// tx := db.Begin()
// delTx := tx.Delete(&User{}, id)
// if err := delTx.Error; err != nil {
//   fmt.Print(err)
//   tx.Rollback()
// } else {
//   fmt.Print("Rows affected: %d", delTx.RowsAffected)
//   tx.Commit()
// }

// user := NewUser(email, password)
// if db.Model(&user).Where("email = ?", email).Updates(&user).RowsAffected == 0 {
//     db.Create(&user)
// }

// dir := filepath.Join(".", "uploads")
//   if err := os.MkdirAll(dir, 0755); err != nil {
//     return errors.WithStack(err)
//   }
/////////////FILE
// Get Buffer from file
// buffer, err := fileFormFile.Open()
// if err != nil {
// 	fmt.Println("image upload error -->", err, buffer)
// }
// fmt.Println("image upload buffer -->", buffer)
// defer buffer.Close()

// errSaveFile := c.SaveFile(fileFormFile, "/home/redcode/Desktop/src/border_patrol/uploads/xx")
// if errSaveFile != nil {
// 	fmt.Println("image save error -->", errSaveFile, saveDir)
// }
// fmt.Println("Save File ")

// Check for errors:
// if err == nil {
// 	// 👷 Save file to root directory:
// 	c.SaveFile(file, fmt.Sprintf("./%s", file.Filename))
// 	// 👷 Save file inside uploads folder under current working directory:
// 	c.SaveFile(file, fmt.Sprintf("./uploads/%s", file.Filename))
// 	// 👷 Save file using a relative path:
// 	c.SaveFile(file, fmt.Sprintf("/tmp/uploads_relative/%s", file.Filename))
// }
//uniqueId := uuid.New()
//filename := strings.Replace(uniqueId.String(), "-", "", -1)
//fileExt := strings.Split(file.Filename, ".")[1]
//fmt.Println(uniqueId, file, filename, file.Filename) ///error file.Filename
// vdo := fmt.Sprintf("%s.%s", filename, fileExt)

// err = c.SaveFile(file, fmt.Sprintf("./uploads/%s", vdo))
// if err != nil {
// 	log.Println("image save error -->", err)
// 	//return c.JSON(fiber.Map{"status": 500, "message": "server upload file"})
// }

// file, header, err := c.FormFile("file")
// if err != nil { log.Println("image upload error -->", err); return c.JSON(fiber.Map{"status": 500, "message": " err"});	}
// mr, err := r.MultipartReader()
// if err != nil { log.Println("image upload error -->", err); return c.JSON(fiber.Map{"status": 500, "message": " err"});	}
// part, err := mr.NextPart()
// if err != nil { log.Println("image upload error -->", err); return c.JSON(fiber.Map{"status": 500, "message": " err"});	}

//   var b bytes.Buffer
//   io.CopyN(&b, part, int64(1<<20))
//   fmt.Println(b.String())
//   defer file.Close()
// file, err := c.FormFile("formData")
// if err != nil {
//     return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
//         "c.FormFile error": true,
//         "msg":   err.Error(),
//     })
// }
// Get Buffer from file
// buffer, err := file.Open()
// if err != nil {
//     return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
//         "file.Open error": true,
//         "msg":   err.Error(),
//     })
// }
// defer buffer.Close()

// id, err := strconv.ParseInt(c.Params("formData"), 10, 64)
// if err != nil {
// 	fmt.Println("Err", err)
// 	return c.Status(422).JSON(fiber.Map{"errors": [1]string{"We were not able to process your expense"}})
// }
// fmt.Println(id)
// c.Attachment()
// c.Attachment("./upload/images/logo.png")

// fmt.Println("Context", c.Context())
// fmt.Println("IsProxyTrusted", c.IsProxyTrusted())
// fmt.Println("AllParams", c.AllParams())
//fmt.Println("Context().Reques", c.Context().Request)
//fmt.Println("Context().Header", c.Request().Header)

//fileFormFile, errFormFile := c.FormFile("vdo")

////////////////// OTHERS
/// ต้องดึง Admin  Role
//db.Model(&User{}).Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&result{})

//	fmt.Println("data=",data, "data รหัสคอมแพร empPASS(", emp, ")==", data["password"])
//database.DB.Model(&emp).Updates(map[string]interface{}{"name": "hello", "age": 18, "active": false})
// 	func UpdateDog(c *fiber.Ctx) error {
//     dog := new(entities.Dog)
//     id := c.Params("id")

//     if err := c.BodyParser(dog); err != nil {
//         return c.Status(503).SendString(err.Error())
//     }

//     config.Database.Where("id = ?", id).Updates(&dog)
//     return c.Status(200).JSON(dog)
// }

// cookie := c.Cookies("jwt")
// token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
// 	return []byte(SecretKey), nil
// })

// if err != nil {
// 	c.Status(fiber.StatusUnauthorized)
// 	return c.JSON(fiber.Map{
// 		"message": "unauthenticated",
// 	})
// }
// claimsIDuser := token.Claims.(*jwt.StandardClaims)

// cookie := c.Cookies("jwt")
// token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
// 	return []byte(SecretKey), nil
// })
// if err != nil {
// 	c.Status(fiber.StatusUnauthorized)
// 	return c.JSON(fiber.Map{
// 		"message": "unauthenticated",
// 	})
// }
// claims := token.Claims.(*jwt.StandardClaims)
//var data map[string]string
// if err := c.BodyParser(&data); err != nil {
// 	return err
// }

// type LessVdo struct {
// 	LessonID string `json:"lesson_id"`
// 	Header   string `json:"header"`
// 	Content  string `json:"content"`
// 	Title    string `json:"title"`
// 	Src_dir  string `json:"src_dir"`
// 	Director string `json:"director"`
// 	Status   string `json:"status"`
// }
// var lv LessVdo
// rows, err := database.DB.Table("lessons").
// 	Select("lessons.lesson_id, lessons.header, lessons.content,  vdos.title, vdos.src_dir, vdos.director, vdos.status ").
// 	Joins("JOIN vdos on  vdos.vdo_id = lessons.lesson_id").Rows()

// for rows.Next() {
// 	rows.Scan(&lv.LessonID, &lv.Header, &lv.Content, &lv.Title, &lv.Src_dir, &lv.Director, &lv.Status)
// 	fmt.Println("lv:", lv.LessonID, lv.Header, lv.Content, lv.Title, lv.Src_dir, lv.Director, lv.Status) //fmt.Println(&lv.EmployeeID, &lv.Name, &lv.City, &lv.Email, &lv.Password, &lv.Role, &lv.Access_poin)

// }
// if lv.LessonID == "" {
// 	fmt.Println("error lesson", err)
// 	return c.JSON(fiber.Map{"message": " not found Lesson"})
// }

// database.DB.Joins("lessons").
//database.DB.Select("lessons.lesson_id, lessons.header, lessons.content,  vdos.title, vdos.src_dir, vdos.director, vdos.status ").
// open output file
// fo, err := os.Create("uploads/output.txt")
// if err != nil {
// 	fmt.Println("os.Create ", err)
// }
// // close fo on exit and check for its returned error
// if err := fo.Close(); err != nil {
// 	fmt.Println(err)
// }
// //}()
// // make a buffer to keep chunks  that are read
// buf := make([]byte, 1024)
// for {
// 	//read a chunk
// 	n, err := fi.Read(buf)
// 	if err != nil && err != io.EOF {
// 		fmt.Println("if err != nil && err != io.EOF {", err)
// 	}
// 	if n == 0 {
// 		break
// 	}

// 	//write a chunk
// 	if _, err := fo.Write(buf[:n]); err != nil {
// 		fmt.Println("if _, err := fo.Write(buf[:n]); err != nil {", err)
// 	}
// }
