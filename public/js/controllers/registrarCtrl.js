app.controller('registrarCtrl', ['$scope', '$http', function($scope, $http){
	
	// get student list
	$http.get('/registrar/students').success(function(students){
		$scope.students = students;
	});

	// view specific student information
	$scope.viewInfo = function(student_id){
		$http.get('/registrar/student-info/' + student_id).success(function(studentInfo){
			$scope.studentInfo = studentInfo;
			var studentGrades = [];
			for (var i = studentInfo.subjects.length - 1; i >= 0; i--) {
				 if(studentInfo.subjects[i].Prelim){
				 	studentGrades.push(studentInfo.subjects[i]);
				 }
			};

			$http.get('/registrar/student-request/' + studentInfo.student_no).success(function(student){
				$scope.schoolInfo = student;
				$scope.scheduleReq = student.request;
			});
			$scope.studentGrades = studentGrades;
		});


	};
	// set student Schedule and enroll student
	$scope.studentSchedule = function(student_id){
		$scope.student_id = student_id;
		// get student info
		$http.get('/registrar/studentSchedule/'+ student_id).success(function(student){

			$scope.student = student;
			
			// get student school info
			$http.get('/registrar/school-info/'+ student.student_no).success(function(data){

				$scope.studentSchoolInfo = data;
				

				$http.get('/registrar/student-enrolled/'+ $scope.studentSchoolInfo.student_no).success(function(student){
					if(student.enrolled === false){
						$scope.student_schedule = true;
						$scope.studentEnrolled = false;
					}else{
						$scope.student_schedule = false;
						$scope.studentEnrolled = true;
						$scope.showSchedule = false;
					}
				});

				// find section based on year, course, and term
				$http.get('/registrar/student-section/'+ $scope.studentSchoolInfo.course_name).success(function(sections){
					var sectionList = [];
						for (var i = sections.length - 1; i >= 0; i--) {

							if(sections[i].term == data.term && sections[i].year_level == data.year_level){
								sectionList.push(sections[i]);
							}
						}
					$scope.sectionList = sectionList;
				});

			});

		});
	};

	// find section schedule, add and find student curriculum subjects, student user access
	$scope.enrollStudent = function(section_id,school_info){
		// get class schedule
		$http.get('/registrar/class-schedule/'+ section_id).success(function(schedules){
			$scope.sectionSchedules = schedules;
		});

		// irregular student
		if(school_info.status == "irregular"){
			
			$scope.studentRegular = true;
			$scope.showSchedule = false;
			$scope.refreshIrregSched();

		}else{//regular student
			// utilities
			$scope.studentRegular = false;
			$scope.showSchedule = true;
			
		}

		// enroll student
		school_info.enrolled = true;


		// enroll student
		$http.put('/registrar/enroll-student/' + school_info.student_no, school_info).success(function(data){
		
		});

		//get curriculum subjects
		$http.get('/registrar/student-curriculum/' + school_info.curriculum).success(function(curriculum){
			var curriculumSubjects = [];
			for (var i = curriculum.length - 1; i >= 0; i--) {
				for (var b = curriculum[i].subjects.length - 1; b >= 0; b--) {
					if(curriculum[i].subjects[b].course_name == school_info.course_name){
						
						// add student curriculum subjects
						$http.put('/registrar/student-subjects/' + $scope.student_id,  curriculum[i].subjects[b]).success(function(student){
						});

					}
				}
			}
		});

		

		// student user access
		var studentAccess = $scope.student;
		var userAccess ={
			username : studentAccess.student_no,
			password : "welcome",
			name : studentAccess.first_name + " " + studentAccess.middle_name + " " + studentAccess.last_name,
			roles : "student"
		};

		// add user
		$http.post('/registrar/student-access', userAccess).success(function(data){
		});

		// utilities
		$scope.showSchedule = true;

	};
	$scope.viewStudents = function(schedule){
		$scope.student_list = [];
		$scope.studentList = true;
		$scope.showSchedule = false;
		$http.get('/registrar/student-count/' + schedule.instructor_id).success(function(teacher){

			for (var x = teacher.studentList.length - 1; x >= 0; x--) {
				if(teacher.studentList[x].subject_name === schedule.subject_name && teacher.studentList[x].section === schedule.section){
					$scope.student_list.push(teacher.studentList[x]);
				}
			}

			$scope.student_count = $scope.student_list.length;
			$scope.students_course = schedule.course_name;

		});
	}
	$scope.closeStudentList = function(){
		$scope.studentList = false;
		$scope.showSchedule = true;
	}
	// add student schedule if regular
	$scope.subjectSchedule = function(){
		var sectionSchedules =  $scope.sectionSchedules;
		var id = $scope.studentSchoolInfo._id; 
		var schedules = [];
		var student_name = $scope.student.first_name + " " + $scope.student.middle_name + " " + $scope.student.last_name;

		for (var i = sectionSchedules.schedule.length - 1; i >= 0; i--) {

		    var setSchedule = {
		    	section_name: sectionSchedules.schedule[i].section,
			    subject_name:  sectionSchedules.schedule[i].subject_name,
			    subject_des:  sectionSchedules.schedule[i].subject_des,
			    units:  sectionSchedules.schedule[i].units,
			    cost_perUnits:  sectionSchedules.schedule[i].cost_perUnits,
			    days:  sectionSchedules.schedule[i].days,
			    time:  sectionSchedules.schedule[i].time,
			    room:  sectionSchedules.schedule[i].room,
			    instructor:  sectionSchedules.schedule[i].instructor,
			    year_level:  sectionSchedules.year_level,
		        term:  sectionSchedules.term,
		        course_name:  $scope.studentSchoolInfo.course_name,
		        student_no: $scope.studentSchoolInfo.student_no,
		        student_name: student_name
		    };
		    // add student schedule
			$http.put('/registrar/student-schedules/' + id, setSchedule).success(function(schedules){

			});
			// add to teacher student list
			$http.put('/registrar/teacher-students/' + sectionSchedules.schedule[i].instructor, setSchedule).success(function(studentList){
				
			});
		} 
		$scope.student_schedule = false;
	};
	// add student schedule for irregular
	$scope.irregularSchedule = function(schedule){
		var id = $scope.studentSchoolInfo._id;
		var student_name = $scope.student.first_name + " " + $scope.student.middle_name + " " + $scope.student.last_name;
		    var setSchedule = {
		    	section_name: schedule.section,
			    subject_name:  schedule.subject_name,
			    subject_des:  schedule.subject_des,
			    units:  schedule.units,
			    cost_perUnits:  schedule.cost_perUnits,
			    days:  schedule.days,
			    time:  schedule.time,
			    room:  schedule.room,
			    instructor:  schedule.instructor,
			    year_level:  $scope.sectionSchedules.year_level,
		        term:  $scope.sectionSchedules.term,
		        course_name:  $scope.studentSchoolInfo.course_name,
		        student_no: $scope.studentSchoolInfo.student_no,
		        student_name: student_name
		    };

	    // add student schedule
		$http.put('/registrar/student-schedules/' + id, setSchedule).success(function(schedules){
			if(schedules !== null){
				$scope.refreshIrregSched();
				// add to teacher student list
				$http.put('/registrar/teacher-students/' + schedule.instructor, setSchedule).success(function(studentList){
					console.log(studentList);
				});
			}else{
				$scope.errorStudentSchedule = schedule.subject_name + " schedule is already selected";
			}
		});
	};
	// delete schedule for irregular student
	$scope.deleteIrregSchedule = function(schedule){
		var student_id = $scope.studentSchoolInfo._id;
		var student_no = $scope.studentSchoolInfo.student_no;

		// delete student schedule
		$http.put('/registrar/delete-student-schedules/' + student_id, schedule).success(function(data){
			$scope.refreshIrregSched();
		});
		
		// delete teacher student
		$http.put('/registrar/delete-teacher-student/' + student_no, schedule).success(function(data){
		});
	};

	$scope.refreshIrregSched = function(){
		$http.get('/registrar/studentIrregular-schedules/' + $scope.studentSchoolInfo._id).success(function(schedules){
			$scope.irregularSchedules = schedules;
		});
	};
	// utilities
	$scope.back = function(){
		$scope.showSchedule = false;
	};
	// close StudentInfo
	$scope.closeStudentInfo = function(){
		$scope.student_schedule = false;
	};

	$scope.saveIrregularSched = function(){
		$scope.student_schedule = false;
	};

	$scope.closeErrorMessageEnrolled = function(){
		$scope.studentEnrolled = false;
	};
	$scope.getStudentReq = function(){

	}
}]);