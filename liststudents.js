function ListStudent(){
	this.dssv = [];

	//khi thêm 1 sv sẽ push vào dssv
	this.create = function(addStudent){
		this.dssv.push(addStudent); 
	}

	this.destroy = function(deleteStudent){
		for(var i=0; i< deleteStudent.length ;i++){			
			for(var j=0; j< this.dssv.length ;j++){
				var student = this.dssv[j];
				if(deleteStudent[i] == student.code){
					this.dssv.splice(j,1);
				}				
			}
        }
	}

	this.update = function(editStudent){
		for(var i=0; i< this.dssv.length ;i++){			
			var student = this.dssv[i];
			if(editStudent.code == student.code){
				student.code  = editStudent.code;
				student.name  = editStudent.name;
				student.cmnn  = editStudent.cmnn;
				student.phone = editStudent.phone;	
				student.email = editStudent.email;	
			}
		}
	}

	this.search = function(keyWord){
		const result = new ListStudent();
		for(var i=0; i< this.dssv.length ;i++){			
			var student = this.dssv[i];
			if(student.name.toLowerCase().trim().search(keyWord.toLowerCase().trim()) != -1){
                result.create(student);
            }			
        }
        return result;
	}

	this.searchCode = function(code){
		for(var i=0; i< this.dssv.length ;i++){			
			var student = this.dssv[i];
			if(code == student.code){
				return student;
			}				
        }
        return null;
	}
	
}