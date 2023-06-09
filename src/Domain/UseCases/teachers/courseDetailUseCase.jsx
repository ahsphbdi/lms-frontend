import {
  teacherCourseDetailRepository,
  teacherCourseDetailGerStudentsSettingRepository,
  teacherCourseDetailSetStudentAccessRepository,
} from "../../../Data/Repositories/teachers/courseDetailRespository";

async function teacherCourseDetailUseCase(courseId) {
  return await teacherCourseDetailRepository(courseId);
}

async function teacherCourseDetailGerStudentsSettingUseCase(courseId) {
  return await teacherCourseDetailGerStudentsSettingRepository(courseId);
}

async function teacherCourseDetailSetStudentAccessUseCase(courseId, data) {
  return await teacherCourseDetailSetStudentAccessRepository(courseId, data);
}

export {
  teacherCourseDetailUseCase,
  teacherCourseDetailGerStudentsSettingUseCase,
  teacherCourseDetailSetStudentAccessUseCase,
};
