import Failure from "../../../Core/Failure/Failure";
import { dateSub } from "../../../Core/utils/utilsFuncs";
import TeacherHomeRepository from "../../../Data/Repositories/teachers/homeRepository";

export default async function TeacherHomeUseCase() {
  const result = await TeacherHomeRepository();
  if (result instanceof Failure) return result;
  const currDateObj = new Date(result.now);
  const currDateStr = `${currDateObj.getFullYear()}/${currDateObj.getMonth()}/${currDateObj.getDate()}`;

  let weeklyData = [[], [], [], [], [], [], [], []];
  let next48h = [];
  let exams = [];
  let assignments = [];
  let tdate;
  let tdatestr;
  let diff;
  for (let session of result.sessions) {
    tdate = new Date(session.date.replace("-", "/").replace("-", "/"));
    tdatestr = `${tdate.getFullYear()}/${tdate.getMonth()}/${tdate.getDate()}`;
    diff = dateSub(currDateStr, tdatestr);
    if (diff.day <= 2) next48h.push(session);
    weeklyData[diff.day].push(session);
    if (session.exams.length !== 0) {
      for (let exam of session.exams) {
        exams.push(exam);
      }
    }
    if (session.assignments.length !== 0) {
      for (let assignment of session.assignments) {
        assignments.push(assignment);
      }
    }
  }
  return {
    weeklyData: weeklyData,
    next48h: next48h,
    courses: result.courses,
    exams: exams,
    assignments: assignments,
  };
}
