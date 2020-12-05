var listSv = new ListStudent();
var validate = new Validation();

//khi bật lên hiển thị trực tiếp data lưu trong storage
GetStorage();

//Bổ sung thuộc tính cho students
Students.prototype.pointJava   = '';
Students.prototype.pointPhp    = '';
Students.prototype.pointPython = '';
Students.prototype.DTB 		   = '';
Students.prototype.XepLoai 	   = '';

//Bổ sung phương thức cho students
Students.prototype.TinhDTB = function(){
	this.DTB = (Number(this.pointPhp) + Number(this.pointJava) + Number(this.pointPython)) / 3;
}

Students.prototype.XepLoai = function(){
	if(this.DTB <= 10 && this.DTB >=8){
		this.XepLoai = 'Loại giỏi';
	}else if(this.DTB < 8 && this.DTB >= 6.5){
		this.XepLoai = 'Loại khá';
	}else if(this.DTB < 6.5 && this.DTB >= 5){
		this.XepLoai = 'Loại trung bình';
	}else{
		this.XepLoai = 'Loại yếu';
	}
}

console.log(listSv.DTB);


//tìm phần tử theo id của nó - trả về HTMLElement or null
function domId(id){
	var element = document.getElementById(id);
	return element;
}

//Kiểm tra tự động null
function TestInputNull(id, value){
	if(validate.testNull(value) == true){
		domId(id).style.borderColor = 'red';
		return true;
	}else{
		domId(id).style.borderColor = 'green';
		return false;
	}
}

function createStudent(){
	//get data của người dùng input
	var code  = domId('code').value;
	var name  = domId('name').value;
	var cmnn  = domId('cmnn').value;
	var phone = domId('phone').value;
	var email = domId('email').value;

	var error = 0;
	if(TestInputNull('code',code) == true){
		error++;
	}
	if(TestInputNull('name',name) == true){
		error++;
	}
	if(TestInputNull('cmnn',cmnn) == true){
		error++;
	}
	if(validate.testEmail(email)){
		domId('email').style.borderColor = 'green';
	}else{
		domId('email').style.borderColor = 'red';	
		error++;	
	}
	if(validate.testPhone(phone)){
		domId('phone').style.borderColor = 'green';
	}else{
		domId('phone').style.borderColor = 'red';
		error++;
	}
	if(error !=0){
		return;
	}

	//Thêm student
	var student = new Students(code,name,cmnn,phone,email);
	//gán các gt cho thuộc tính của student
	student.pointPhp 	= domId('php').value;
	student.pointJava 	= domId('java').value;
	student.pointPython = domId('python').value;
	student.TinhDTB();
    student.XepLoai();
	listSv.create(student);
	//khi click vào thêm sẽ load ds sv 
	loadListStudent(listSv)
	//console.log(listSv);
}

//tạo thẻ td, sét class, value
function createTagId(className, value){
	const td 	 = document.createElement('td');
	td.className = className;
	td.innerHTML = value;
	return td;
}

function loadListStudent(ListStudent){
	var listTableSv = domId('tbodyStudent');
	//xóa tr ở tbodyStudent
	listTableSv.innerHTML = '';

    for(var i = 0; i <  ListStudent.dssv.length; i++ ){
    	//Lấy thông tin sinh viên từ trong mảng sinh viên
    	var student = listSv.dssv[i];
    	//console.log(student);

    	//Tạo thẻ tr và thêm thuộc tính cho tr
    	var trSv = document.createElement('tr');
    	trSv.id = student.code;
    	trSv.className = 'trStudent';
    	trSv.setAttribute('onclick',"editStudent('"+student.code+"')");

    	//Tạo các thẻ td,checkbox và filter dữ liệu sinh viên thứ [i] vào
    	//checkbox
    	const tdCheckBox = document.createElement('td');
    	const ckbCode = document.createElement('input');
    	ckbCode.setAttribute('type','checkbox')
    	ckbCode.setAttribute('class','codeCkbSv')
		ckbCode.setAttribute('value',student.code)
		//console.log(ckbCode);
		tdCheckBox.appendChild(ckbCode);

		//td
    	const tdCode  = createTagId('code',student.code);
    	const tdName  = createTagId('name',student.name);
    	const tdCmnn  = createTagId('cmnn',student.cmnn);
    	const tdPhone = createTagId('phone',student.phone);
    	const tdEmail = createTagId('email',student.email);

 		//Tạo td  DTB và  xếp loại 
        var tdDTB 	  = createTagId("DTB",student.DTB);
        var tdXepLoai = createTagId ("XepLoai",student.XepLoai);

        //Append các td vào tr
        trSv.appendChild(tdCheckBox);
        trSv.appendChild(tdCode);
        trSv.appendChild(tdName);
        trSv.appendChild(tdCmnn);
        trSv.appendChild(tdPhone);
        trSv.appendChild(tdEmail);
        trSv.appendChild(tdDTB);
        trSv.appendChild(tdXepLoai);
        
        //Append các tr vào tbodyStudent
        listTableSv.appendChild(trSv); 	
    }
}


//khi người dùng click vào tr sẽ kich hoạt function editStudent, 
//và gọi đến searchCode() nếu !=null thì lấy các gt ở các cột
function editStudent(code){
	var student = listSv.searchCode(code);
	console.log(student);
	if(student != null){
		domId('code').value  = student.code;
		domId('name').value  = student.name;
		domId('cmnn').value  = student.cmnn;
		domId('phone').value = student.phone;
		domId('email').value = student.email;
	}
}

function updateStudent(code){
    //Lấy dữ liệu từ người dùng nhập vào
	var code  = domId('code').value;
	var name  = domId('name').value;
	var cmnn  = domId('cmnn').value;
	var phone = domId('phone').value;
	var email = domId('email').value;
	
	//validate
	var error = 0;
	if(TestInputNull('code',code) == true){
		error++;
	}
	if(TestInputNull('name',name) == true){
		error++;
	}
	if(TestInputNull('cmnn',cmnn) == true){
		error++;
	}
	if(validate.testEmail(email)){
		domId('email').style.borderColor = 'green';
	}else{
		domId('email').style.borderColor = 'red';	
		error++;	
	}
	if(validate.testPhone(phone)){
		domId('phone').style.borderColor = 'green';
	}else{
		domId('phone').style.borderColor = 'red';
		error++;
	}
	if(error !=0){
		return;
	}

	//Sửa student
	var student = new Students(code,name,cmnn,phone,email);	
	//gán các gt cho thuộc tính của student
	student.pointPhp 	= domId('php').value;
	student.pointJava 	= domId('java').value;
	student.pointPython = domId('python').value;
	student.TinhDTB();
    student.XepLoai();
    //khi click vào sửa sẽ load ds sv 
	listSv.update(student);
	loadListStudent(listSv)
	//console.log(listSv);
}


function destroyStudent(){
	//Mảng checkbox
	const codeSv = document.getElementsByClassName('codeCkbSv');
	//Mảng mã sinh viên được chọn
	const listCodeSvCheck = [];
	for(let i=0;i<codeSv.length;i++){
		//console.log(codeSv[i]);
		if(codeSv[i].checked){//Kiểm phần tử checkbox đó có được chọn hay chưa
			listCodeSvCheck.push(codeSv[i].value);
		}
	}
	listSv.destroy(listCodeSvCheck);
	loadListStudent(listSv);
}

function searchStudent(){
  	var keyWord    = domId("keyword").value;
    var listResult = listSv.search(keyWord);
    loadListStudent(listResult);
}

function SetStorage(){
	//Chuyển đổi object mảng danh sách sinh viên thành chuỗi json
	const jsonListStudent = JSON.stringify(listSv.dssv);
	//Rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
	localStorage.setItem('DanhSachSV',jsonListStudent);
}

function GetStorage(){
	//Lấy ra chuỗi json là mảng danhsachsinhvien thông qua tên DanhSachSV
	const jsonListStudent = localStorage.getItem('DanhSachSV');
	//chuyển thành object
	const arrayListStudent = JSON.parse(jsonListStudent);
	//lưu vào dssv
	listSv.dssv = arrayListStudent;
	loadListStudent(listSv);
}


