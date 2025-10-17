import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

function Home() {
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("authToken");
  const fullName = localStorage.getItem("userFullName");

  const [greetings, setGreetings] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [inactiveStudents, setInactiveStudents] = useState(0);
  const [totalBranches, setTotalBranches] = useState(0);
  const [activeBranches, setActiveBranches] = useState(0);
  const [inactiveBranches, setInactiveBranches] = useState(0);
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [motivation, setMotivation] = useState({});

  
  const [maxIdStudent, setMaxIdStudent] = useState(0);
  const [recentStudentName, setRecentStudentName] = useState('');
  const [recentStudentDate, setRecentStudentDate] = useState();
  const [recentStudentBranch, setRecentstudentBranch] = useState();

  const [secondMaxIdStudent, setSecondMaxIdStudent] = useState(0);
  const [secondRecentStudentName, setSecondRecentStudentName] = useState('');
  const [secondRecentStudentDate, setSecondRecentStudentDate] = useState();
  const [secondRecentStudentBranch, setSecondRecentStudentBranch] = useState('');


  const [maxPercentageStudent, setMaxPercentageStudent] = useState({});
  const [secondMaxPercentageStudent, setsecondMaxPercentageStudent] = useState({});
  const [thirdMaxPercentageStudent, setThirdMaxPercentageStudent] = useState({});


  const studentData = [
    { name: 'Total Students', value: totalStudents },
    { name: 'Active Students', value: activeStudents },
    { name: 'InActive Students', value: inactiveStudents }
  ];

  const branchData = [
    { name: 'Total', value: totalBranches },
    { name: 'Active', value: activeBranches },
    { name: 'InActive', value: inactiveBranches }
  ]

  const COLORS = ["#2ec6a5ff", "#ffc107", "#858d89ff"];


 

  useEffect(() => {
    getTotalStudents();
    getActiveStudents();
    getInactiveStudents();
    getTotalBranches();
    getActiveBranches();
    getInactiveBranches();
    studentMaxId();
    secondStudentMaxId();
    studentWithMaxPercentage();
    studentWithSecondMaxPercentage();
    studentWithThirdMaxPercentage();
    getMotivation();

    if (maxIdStudent > 0) {
      getStudentById();
    }
    if (secondMaxIdStudent > 0) {
      getSecondStudentById();
    }

    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreetings("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreetings("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreetings("Good Evening");
    } else {
      setGreetings("Good Night");
    }
  }, [maxIdStudent, secondMaxIdStudent]);

  // Calendar functions
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };





  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setDate(newDate);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return (
      day === date.getDate() &&
      currentMonth.getMonth() === date.getMonth() &&
      currentMonth.getFullYear() === date.getFullYear()
    );
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Previous month days
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true
      });
    }

    // Next month days
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false
      });
    }

    return days;
  };


  console.log(motivation)

  


  async function getMotivation() {
    try {
      const id = Math.floor(Math.random() * 21) + 1;
      console.log(id);

      const response = await axios.get(`http://localhost:8081/api/motivation/getMotivationById/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      console.log(response.data);
      setMotivation(response.data);
    } catch (error) {
      console.error("Error in fetching motivation: ", error)
    }
  }

  // API functions (keep your existing functions)
  async function getTotalStudents() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/studentCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalStudents(response.data);
    } catch (error) {
      console.error("Error fetching total students:", error);
    }
  }

  async function getActiveStudents() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/activeStudentsCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActiveStudents(response.data);
    } catch (error) {
      console.error("Error fetching active students:", error);
    }
  }

  async function getInactiveStudents() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/inActiveStudentsCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInactiveStudents(response.data);
    } catch (error) {
      console.error("Error fetching inactive students:", error);
    }
  }

  async function getTotalBranches() {
    try {
      const response = await axios.get("http://localhost:8081/api/branch/branchCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalBranches(response.data);
    } catch (error) {
      console.error("Error fetching total branches:", error);
    }
  }

  async function getActiveBranches() {
    try {
      const response = await axios.get("http://localhost:8081/api/branch/activeBranchesCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActiveBranches(response.data);
    } catch (error) {
      console.error("Error fetching active branches:", error);
    }
  }

  async function getInactiveBranches() {
    try {
      const response = await axios.get("http://localhost:8081/api/branch/inActiveBranchesCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInactiveBranches(response.data);
    } catch (error) {
      console.error("Error while fetching inactive branches:", error);
    }
  }

  async function studentMaxId() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/maxId",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMaxIdStudent(response.data);
      console.log('Max id of student: ', response.data);
    } catch (error) {
      console.error("Error while fetching student max Id:", error);
    }
  }

  async function secondStudentMaxId() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/secondMaxId",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSecondMaxIdStudent(response.data);
      console.log('Second max id of student: ', response.data);
    } catch (error) {
      console.error("Error while fetching student second max Id:", error);
    }
  }

  async function getStudentById() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/getStudentById/${maxIdStudent}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRecentStudentName(response.data.fullName);
      setRecentStudentDate(response.data.createdDate);
      setRecentstudentBranch(response.data.branch.code)
      console.log("Student Details of max Id:", response.data);
    }
    catch (error) {
      console.log("Error in fetching student details of max id:", error);
    }
  }

  async function getSecondStudentById() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/getStudentById/${secondMaxIdStudent}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSecondRecentStudentName(response.data.fullName);
      setSecondRecentStudentDate(response.data.createdDate);
      setSecondRecentStudentBranch(response.data.branch.code);
      console.log("Student Details of second max Id:", response.data);
    }
    catch (error) {
      console.log("Error in fetching student details of second max id:", error);
    }
  }

  async function studentWithMaxPercentage() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/maxPercentage`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMaxPercentageStudent(response.data);
      console.log('Student of max percentage', response.data);

    } catch (error) {
      console.log("Error while fetching student of max percentage: ", error)
    }
  }

  async function studentWithSecondMaxPercentage() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/secondMaxPercentage`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setsecondMaxPercentageStudent(response.data);
      console.log('Student of second max percentage', response.data);

    } catch (error) {
      console.log("Error while fetching student of second max percentage: ", error)
    }
  }

  async function studentWithThirdMaxPercentage() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/thirdMaxPercentage`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setThirdMaxPercentageStudent(response.data);
      console.log('Student of third max percentage', response.data);

    } catch (error) {
      console.log("Error while fetching student of third max percentage: ", error)
    }
  }

  const calendarDays = generateCalendarDays();
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <>
      <div >
        <div className="row row-cols-1 row-cols-md-3 g-1">
          <div className="card" style={{ textAlign: 'center', maxWidth: '350px' }}>
            <img src="welcome.png" className="card-img-top" alt="welcome" style={{ maxHeight: '200px' }} />
            <div className="card-body" style={{ padding: "2px" }}>
              <h5 className="card-title">{greetings}, <b>{fullName}</b></h5>
              <p className="card-text">{motivation.motivationText} - <b><sub>{motivation.author}</sub></b></p>
            </div>
          </div>

          <div className="card">
            <div className="charts-container">
              <div className="chart-card">
                <div className="d-flex">
                  <img src="student-status.png" alt="studentstatus" style={{ width: '25px', height: '25px', marginTop: '8px' }} />
                  <h5 style={{ fontWeight: '200', marginLeft: '20px', marginTop: '8px', marginLeft: '3px' }}>Students Status</h5>

                </div>
                <ResponsiveContainer width='100%' height={260}>
                  <PieChart>
                    <Pie
                      data={studentData}
                      cx='50%'
                      cy='50%'
                      labelLine={false}
                      innerRadius={20}
                      outerRadius={100}
                      dataKey='value'
                      label={({ name }) => null}
                    >
                      {studentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="chart-card">
              <div className="d-flex">
                <img src="branch-status.png" alt="branchstatus" style={{ width: '25px', height: '23px', marginTop: '5px' }} />
                <h5 style={{ fontWeight: '200', marginLeft: '20px', marginTop: '5px', marginLeft: '4px' }}>Branch Status</h5>

              </div>
              <ResponsiveContainer width="100%" height={260} >
                <BarChart
                  data={branchData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  {/* <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: "14px", marginTop: "10px" }}
                    /> */}
                  <Bar dataKey="value" barSize={40} radius={[8, 8, 0, 0]}>
                    {branchData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>





        </div>
        <div className="cardrow">
          <div className="row row-cols-1 row-cols-md-3 g-1 mt-3">


            <div className="col">
              {/* <div className="card" style={{ maxWidth: '350px', marginLeft:'9px' }}>
                <div className="cart-title">
                  <div className="d-flex">
                    <img src="recent.png" alt="recent" style={{ width: '22px', height: '22px', marginTop: '15px' }} />
                    <h5 style={{ fontWeight: '200', marginLeft: '20px', marginTop: '5px', marginLeft: '3px', marginTop: '10px' }}>Recent Activities</h5>

                  </div>

                </div>
                <div className='card-body'>


                  <div className="d-flex mt-2">
                    <img src="new-1.gif" alt="newgif" style={{ width: '25px', height: '25px', marginTop: '10px' }} />
                    <p className="text-justify">Student <b style={{ color: '#007bff' }}>{recentStudentName}</b> registered on <b>{recentStudentDate}</b></p>
                  </div>

                  <div className="d-flex">
                    <img src="new-1.gif" alt="newgif" style={{ width: '25px', height: '25px', marginTop: '10px' }} />

                    <p className="text-justify">Student with name <b style={{ color: '#007bff' }}>{secondRecentStudentName}</b> registered on <b>{secondRecentStudentDate}</b></p>
                  </div>

                </div>
              </div> */}


              <div className="card" style={{ maxWidth: '350px', marginLeft: '9px' }}>
                <div className="card-title">
                  <div className="d-flex align-items-center mt-2">
                    <img
                      src="recent.png"
                      alt="recent"
                      style={{ width: '22px', height: '22px', marginRight: '8px' }}
                    />
                    <h5 style={{ fontWeight: '500', margin: 0 }}>Recent Registrations</h5>
                  </div>
                </div>

                <div className="card-body">
                  {/* First recent registration */}
                  <div className="d-flex mt-2">
                    <img
                      src="new-1.gif"
                      alt="newgif"
                      style={{ width: '25px', height: '25px', marginTop: '8px', marginRight: '8px' }}
                    />
                    <p className="text-justify mb-1">
                      <span style={{ color: '#007bff', fontWeight: '600' }}>{recentStudentName}</span><br />
                      <small>
                        Branch: <b>{recentStudentBranch}</b><br />
                        Registered on: <b>{recentStudentDate}</b>
                      </small>
                    </p>
                  </div>

                  {/* Second recent registration */}
                  <div className="d-flex mt-2">
                    <img
                      src="new-1.gif"
                      alt="newgif"
                      style={{ width: '25px', height: '25px', marginTop: '8px', marginRight: '8px' }}
                    />
                    <p className="text-justify mb-1">
                      <span style={{ color: '#007bff', fontWeight: '600' }}>{secondRecentStudentName}</span><br />
                      <small>
                        Branch: <b>{secondRecentStudentBranch}</b><br />
                        Registered on: <b>{secondRecentStudentDate}</b>
                      </small>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="col">
              <div className="card" style={{ marginLeft: '-53px', maxWidth: '430px' }}>
                <div className="card-title">
                  <div className="d-flex">
                    <img src="top.png" alt="top" style={{ width: '20px', height: '20px', marginTop: '10px' }} />
                    <h5 style={{ fontWeight: '200', marginLeft: '20px', marginTop: '10px', marginLeft: '3px' }}>Top Performance</h5>

                  </div>

                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <img src="gold-medal.png" alt="gold" style={{ width: '20px', height: '20px', marginTop: '3px', marginRight: '3px' }} />
                    <p className="text-justify">1st Top Performer <b style={{ color: '#007bff' }} >{maxPercentageStudent.fullName}</b> with percentage <b style={{ color: '#28a745' }}>{maxPercentageStudent.percentage}%</b></p>


                  </div>
                  <div className="d-flex">
                    <img src="silver-medal.png" alt="silver" style={{ width: '20px', height: '20px', marginTop: '3px', marginRight: '3px' }} />
                    <p className="text-justify">2nd Top Performer <b style={{ color: '#007bff' }} >{secondMaxPercentageStudent.fullName}</b> with percentage <b style={{ color: '#28a745' }}>{secondMaxPercentageStudent.percentage}%</b></p>

                  </div>
                  <div className="d-flex">
                    <img src="bronze-medal.png" alt="bronze" style={{ width: '20px', height: '20px', marginTop: '3px', marginRight: '3px' }} />
                    <p className="text-justify">3rd Top Performer <b style={{ color: '#007bff' }} >{thirdMaxPercentageStudent.fullName}</b> with percentage <b style={{ color: '#28a745' }}>{thirdMaxPercentageStudent.percentage}%</b></p>

                  </div>
                </div>
              </div>
            </div>


            <div className="col">
              {/* Modern Calendar Component */}
              <div className="card" style={{ maxWidth: '435px', marginLeft: '-36px' }}>
                <div className="card-body" style={{ height: '250px' }}>
                  {/* <h5 className="card-title">Calendar</h5> */}
                  <div className="modern-calendar">
                    <div className="calendar-header">
                      <div className="calendar-nav">
                        <button className="nav-btn" onClick={() => navigateMonth('prev')}>
                          &lsaquo;
                        </button>
                      </div>
                      <div className="current-month">
                        {formatMonthYear(currentMonth)}
                      </div>
                      <div className="calendar-nav">
                        <button className="nav-btn" onClick={() => navigateMonth('next')}>
                          &rsaquo;
                        </button>
                      </div>
                    </div>

                    <div className="calendar-weekdays">
                      {weekdays.map(day => (
                        <div key={day} className="weekday">{day}</div>
                      ))}
                    </div>

                    <div className="calendar-days">
                      {calendarDays.map(({ day, isCurrentMonth }, index) => (
                        <div
                          key={index}
                          className={`calendar-day ${isCurrentMonth ? 'current-month-day' : 'other-month-day'} ${isToday(day) ? 'today' : ''
                            } ${isSelected(day) ? 'selected' : ''}`}
                          onClick={() => isCurrentMonth && handleDateClick(day)}
                        >
                          {day}
                        </div>
                      ))}
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
