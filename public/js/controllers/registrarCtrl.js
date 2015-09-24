app.controller('registrarCtrl', ['$scope', '$http', function($scope, $http){
	
	// get student list
	$http.get('/registrar/students').success(function(students){
		$scope.students = students;
	});

	// view specific student information
	$scope.viewInfo = function(student_id){
		$http.get('/registrar/student-info/' + student_id).success(function(studentInfo){
			$scope.studentInfo = studentInfo;
		});
	}

	// set student Schedule
	$scope.studentSchedule = function(student_id){
		$scope.student_id = student_id;
		// get student info
		$http.get('/registrar/studentSchedule/'+ student_id).success(function(student){

			$scope.student = student;
			
			// get student school info
			$http.get('/registrar/school-info/'+ student.student_no).success(function(data){

				$scope.studentSchoolInfo = data;
				
				// find student section based on year, course, and term
				$http.get('/registrar/student-section/'+ $scope.studentSchoolInfo.course_name).success(function(sections){
					var sectionList = [];
						for (var i = sections.length - 1; i >= 0; i--) {

							if(sections[i].term == data.term && sections[i].year_level == data.year_level){
								sectionList.push(sections[i]);
							}
						};
					$scope.sectionList = sectionList;
				});

			});

		});
	}

	// find section schedule, add and find student curriculum subjects, student user access
	$scope.enrollStudent = function(section_id,school_info){
		// get class schedule
		
		$http.get('/registrar/class-schedule/'+ section_id).success(function(schedules){
			$scope.sectionSchedules = schedules;
		});
		// enroll student
		
		school_info.enrolled = true;
		$http.put('/registrar/enroll-student/' + school_info.student_no, school_info).success(function(data){
		});

		// get curriculum subjects based on student course year and term
		
		$http.get('/registrar/student-curriculum/' + school_info.curriculum).success(function(curriculum){
			var curriculumSubjects = [];
			for (var i = curriculum.length - 1; i >= 0; i--) {
				for (var b = curriculum[i].subjects.length - 1; b >= 0; b--) {
					if(curriculum[i].subjects[b].course_name == school_info.course_name && curriculum[i].subjects[b].term == school_info.term && curriculum[i].subjects[b].year_level == school_info.year_level){

						curriculumSubjects.push(curriculum[i].subjects[b]);
						// add student curriculum subjects
						$http.put('/registrar/student-subjects/' + $scope.student_id,  curriculum[i].subjects[b]).success(function(student){
							console.log(student);
						});

					}
				};
			};
		});

		// student user access
		
		var studentAccess = $scope.student;
		var userAccess ={
			username : studentAccess.student_no,
			password : "welcome",
			name : studentAccess.first_name + " " + studentAccess.middle_name + " " + studentAccess.last_name,
			roles : "student"
		};

		$http.post('/registrar/student-access', userAccess).success(function(data){
			console.log(data);
		});

	}
	// add student schedule
	$scope.subjectSchedule = function(){
		var sectionSchedules =  $scope.sectionSchedules;
		var id = $scope.studentSchoolInfo._id; 

		var schedules = [];
		for (var i = sectionSchedules.schedule.length - 1; i >= 0; i--) {

		    var setSchedule = {
		    	section_name: sectionSchedules.schedule[i].section,
			    subject_name:  sectionSchedules.schedule[i].subject_name,
			    subject_des:  sectionSchedules.schedule[i].subject_des,
			    units:  sectionSchedules.schedule[i].units,
			    days:  sectionSchedules.schedule[i].days,
			    time:  sectionSchedules.schedule[i].time,
			    room:  sectionSchedules.schedule[i].room,
			    instructor:  sectionSchedules.schedule[i].instructor,
			    year_level:  sectionSchedules.year_level,
		        term:  sectionSchedules.term
		    }
			$http.put('/registrar/student-schedules/' + id, setSchedule).success(function(schedules){
				console.log(schedules);
			})
		}; 
	}
	// close StudentInfo
	$scope.closeStudentInfo = function(){
		$scope.studentInfo = null;
	}
}]);