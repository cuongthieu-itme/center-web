import { AttendanceDetail, AttendanceList } from "@/features/attendance";
import { ClassDetail, ClassList } from "@/features/classes";
import { ClassSessionDetail, ClassSessionList } from "@/features/class-sessions";
import { ChangePassword, EditStudent, MyClasses, MyClassesView, MyScheduleView, StudentDetail, StudentList } from "@/features/students";
import MyAttendanceView from "@/features/students/components/MyAttendanceView";
import { EditTeacher, TeacherDetail, TeacherList } from "@/features/teachers";
import { EditUser, UserDetail, UserList } from "@/features/users";
import { lazy } from "react";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routesPath";

const LoginPage = lazy(() => import("../../pages/auth/login-page"));
const DashboardPage = lazy(
  () => import("../../pages/dashboard/dashboard-page")
);
const OrdersListPage = lazy(
  () => import("../../pages/dashboard/orders-list-page")
);
const AttendanceTrackerPage = lazy(
  () => import("../../pages/tracker")
);

export const authenticationRoutes = [
  { path: AUTH_ROUTES.LOGIN, element: <LoginPage /> },
];

export const protectedRoutes = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <DashboardPage /> },
  { path: PROTECTED_ROUTES.USERS_LIST, element: <UserList /> },
  { path: PROTECTED_ROUTES.USERS_DETAIL, element: <UserDetail /> },
  { path: PROTECTED_ROUTES.USERS_EDIT, element: <EditUser /> },
  { path: PROTECTED_ROUTES.TEACHERS_LIST, element: <TeacherList /> },
  { path: PROTECTED_ROUTES.TEACHERS_DETAIL, element: <TeacherDetail /> },
  { path: PROTECTED_ROUTES.TEACHERS_EDIT, element: <EditTeacher /> },
  { path: PROTECTED_ROUTES.STUDENTS_LIST, element: <StudentList /> },
  { path: PROTECTED_ROUTES.STUDENTS_DETAIL, element: <StudentDetail /> },
  { path: PROTECTED_ROUTES.STUDENTS_EDIT, element: <EditStudent /> },
  { path: PROTECTED_ROUTES.CLASSES_LIST, element: <ClassList /> },
  { path: PROTECTED_ROUTES.CLASSES_DETAIL, element: <ClassDetail /> },
  { path: PROTECTED_ROUTES.ATTENDANCE_LIST, element: <AttendanceList /> },
  { path: PROTECTED_ROUTES.ATTENDANCE_DETAIL, element: <AttendanceDetail /> },
  { path: PROTECTED_ROUTES.ATTENDANCE_TRACKER, element: <AttendanceTrackerPage /> },
  { path: PROTECTED_ROUTES.ORDERS_LIST, element: <OrdersListPage /> },
  { path: PROTECTED_ROUTES.CLASS_SESSIONS_LIST, element: <ClassSessionList /> },
  { path: PROTECTED_ROUTES.CLASS_SESSIONS_DETAIL, element: <ClassSessionDetail /> },
  { path: PROTECTED_ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
  { path: PROTECTED_ROUTES.MY_CLASSES, element: <MyClassesView /> },
  { path: PROTECTED_ROUTES.MY_SCHEDULE, element: <MyScheduleView /> },
  { path: PROTECTED_ROUTES.MY_ATTENDANCE, element: <MyAttendanceView /> },
];
