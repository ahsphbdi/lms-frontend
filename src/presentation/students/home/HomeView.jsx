import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Core/components/Header";
import StudentHomeUseCase from "../../../Domain/UseCases/Students/homeUseCase.js";
import Failure from "../../../Core/Failure/Failure.js";
import "../../../../styles/home.css";
import "../../../../styles/course.css";
import {
  goToCourse,
  goToSession,
  showSemester,
} from "../../../Core/utils/utilsFuncs.js";
import checkPermission from "../../../Core/security/checkPermission.js";
import AuthContext from "../../../Core/contexts/root-context.jsx";
import APP_ROUTES from "../../../Core/constants/Routs.js";

export default function StudentHomeView() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (authContext.isAuthenticated !== null && authContext.isAuthenticated===false) {
    navigate(APP_ROUTES.LOGIN_USER);
  } else if (authContext.isAuthenticated === true && authContext.user.role % 2 !== 0){
    navigate(APP_ROUTES.SPLASH);
  }

  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [assignments, setEssignments] = useState([]);
  const [has_permission, setPermission] = useState(true);
  const [isRespondGenerated, setIsRespondGenerated] = useState(false);
  const [dailyCalendar, setDailyCalendar] = useState([]);
  let daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let curr = new Date();
  let currDay = curr.getDay();
  daysOfWeek = daysOfWeek
    .slice(currDay - 1)
    .concat(daysOfWeek.slice(0, currDay - 1));

  const fetchData = async () => {
    const result = await StudentHomeUseCase();
    console.log(result);
    if (!(result instanceof Failure)) {
      setCourses(result.courses);
      setExams(result.exams);
      setEssignments(result.assignments);
      setDailyCalendar(result.weeklyData);
      setIsRespondGenerated(true);
    }
  };
  useEffect(() => {
    checkPermission(setPermission);
    fetchData();
  }, []);

  const [wrapperRight, setWrapperRight] = useState(0);
  // var dailyCalendarWrapper = document
  //   .getElementsByClassName("daily-calendar-wrapper")
  //   .item(0);
  const calendarTopItem = (index) => {
    setWrapperRight(index * 100);
  };
  if (has_permission && isRespondGenerated)
    return (
        <div className="grid md:grid-cols-2  gap-8 student-home-box">
          <div className="">
            <h2 className="home-box-item-title">current courses</h2>
            <div className="home-box-current-courses courses">
              {courses.map((course) => (
                <div
                  onClick={(e) => goToCourse(e, course?.id, navigate)}
                  key={course.id}
                >
                  <div className="course">
                    <div className="course-title">
                      {course?.course_title.title} group (
                      {course?.group_course_number})
                    </div>
                    <div className="teacher-name">
                      {course?.teacher.user.first_name}{" "}
                      {course?.teacher.user.last_name}
                    </div>
                    <div className="course-data">
                      period {showSemester(course?.semester.semester)}{" "}
                      {course?.semester.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="home-box-item-title">next 48 hours</h2>
            <div className="home-box-next-48"></div>
          </div>
          <div className="">
            <h2 className="home-box-item-title">exams</h2>
            <div className="home-box-exams">
              {exams.map((exam, index) => {
                return (
                  <div key={index}>
                    <p></p>
                  </div>
                );
              })}
            </div>
            <h2 className="home-box-item-title">assignments</h2>
            <div className="home-box-assignments">
              {assignments.map((assignment, index) => {
                return (
                  <div key={index}>
                    <p></p>
                  </div>
                );
              })}
            </div>
            <h2 className="home-box-item-title">daily calendar</h2>
            <div className="home-box-this-week">
              <div className="daily-calendar-top">
                {daysOfWeek.map((day, index) => (
                  <div
                    className="calendar-top-item"
                    onClick={() => calendarTopItem(index)}
                    key={index}
                  >
                    <span>{day}</span>
                  </div>
                ))}
              </div>
              <div className="calendar-wrapper-item-body calendar-wrapper-item-body-top">
                <div>row</div>
                <div>title</div>
                <div>course</div>
                <div>end date</div>
              </div>
              <div className="daily-calendar-slider">
                <div
                  className="daily-calendar-wrapper"
                  style={{
                    right: wrapperRight + "%",
                  }}
                >
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[0].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[1].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[2].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[3].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[4].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[5].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="calendar-wrapper-item">
                    {dailyCalendar[6].map((weekDay, index) => {
                      return (
                        <div
                          key={index}
                          className="calendar-wrapper-item-body calendar-wrapper-item-body-content"
                        >
                          <div>{index + 1}</div>
                          <div
                            onClick={(e) =>
                              goToSession(e, weekDay.id, navigate)
                            }
                          >
                            session {weekDay.session_number}
                          </div>
                          <div
                            onClick={(e) =>
                              goToCourse(e, weekDay.course.id, navigate)
                            }
                          >
                            {weekDay.course.course_title.title} group (
                            {weekDay.course.group_course_number})
                          </div>
                          <div>
                            {weekDay.time_slot.start}-{weekDay.time_slot.end}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  else if (!has_permission)
    return (
      <div>
        <p>permission denied!</p>
      </div>
    );
  else return <div></div>;
}
