import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import TemplateDetails
from "../pages/communications/TemplateDetails";

import EditTemplate
from "../pages/communications/EditTemplate";


import MemberDashboard from "../pages/memberportal/MemberDashboard";
import MemberPortalLayout from "../components/layouts/MemberPortalLayout";
import CheckIn from "../pages/memberportal/CheckIn";
import MyProfile from "../pages/memberportal/MyProfile";
import MyAttendance from "../pages/memberportal/MyAttendance";
import MemberRoute from "../routes/memberRoutes"

import RolePermissionAssignment
from "../pages/roles/RolePermissionAssignment";
import CreateTemplate from "../pages/communications/CreateTemplate"
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AssignRoles from "../pages/users/AssignRoles"
import UserDetails from "../pages/users/UserDetails"
import EditUser from "../pages/users/EditUser"
import Dashboard from "../pages/dashboard/dashboard";
import ServicesPage from "../pages/services/ServicePage";
import ServiceDetails from "../pages/services/ServiceDetails";
import EditService from "../pages/services/EditService";
import CreateService from "../pages/services/CreateService";

import AttendanceRegister from "../pages/attendance/AttendanceRegister"

import SettingsPage from "../pages/settings/SettingsPage";
import MembersPage from "../pages/members/member";
import CreateMember from "../pages/members/CreateMembers";
import EditMember from "../pages/members/EditMembers";
import MemberDetails from "../pages/members/MemberDetails";
import BulkUploadMembers from "../pages/members/BulkUploadMembers";

import Departments from "../pages/department/Departments";
import CreateDepartment from "../pages/department/CreateDepartment";
import EditDepartment from "../pages/department/EditDepartment";
import DepartmentDetails from "../pages/department/DepartmentDetails";

import AttendancePage from "../pages/attendance/AttendancePage";
import AttendanceReports from "../pages/attendance/AttendanceReports";
import AttendanceDashboard from "../pages/attendance/AttendanceDashboard";
import ManualCheckIn from "../pages/attendance/ManualCheckIn";

import BulkSms from "../pages/communications/BulkSms";
import BulkEmail from "../pages/communications/BulkEmail";
import Templates from "../pages/communications/Templates";
import CommunicationHistory from "../pages/communications/CommunicationHistory";

import MainLayout from "../components/layouts/MainLayout";

import ProtectedRoute from "./protectedRoutes";
import UsersPage from "../pages/users/UsersPage";
import CreateUser from "../pages/users/CreateUsers";
import RolesPage from "../pages/roles/RolesPage";
import PermissionsPage from "../pages/permissions/PermissionsPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";

export const router =
  createBrowserRouter([
   {
  path: "/",
  element: <LoginPage />,
},
{
  path: "/signup",
  element: <RegisterPage />
},
    {
      path: "/dashboard",

      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),

      children: [
        {
          index: true,
          element: <Dashboard />,
        },

        // Members

        {
          path: "members",
          element: <MembersPage />,
        },
        {
            path: "members/bulk-upload",
            element: <BulkUploadMembers/>
        },
        {
          path: "members/create",
          element: <CreateMember />,
        },

        {
          path: "members/:id",
          element: <MemberDetails />,
        },

        {
          path: "members/edit/:id",
          element: <EditMember />,
        },

        // Departments

        {
          path: "departments",
          element: <Departments />,
        },

        {
          path:
            "departments/create",

          element:
            <CreateDepartment />,
        },

        {
          path:
            "departments/:id",

          element:
            <DepartmentDetails />,
        },

        {
          path:
            "departments/edit/:id",

          element:
            <EditDepartment />,
        },

        // Attendance

        {
          path: "attendance",

          element:
            <AttendancePage />,
        },

        // {
        //   path:
        //     "attendance/reports",

        //   element:
        //     <AttendanceReports />,
        // },

        // Communications

        {
          path:
            "communications/sms",

          element:
            <BulkSms />,
        },

        {
          path:
            "communications/email",

          element:
            <BulkEmail />,
        },
{
          path:
            "communications/templates/create",

          element:
            <CreateTemplate />,
        },
        {
  path:
    "communications/templates/:id",

  element:
    <TemplateDetails />,
},

{
  path:
    "communications/templates/edit/:id",

  element:
    <EditTemplate />,
},
        {
          path:
            "communications/templates",

          element:
            <Templates />,
        },

        {
          path:
            "communications/history",

          element:
            <CommunicationHistory />,
        },

        //Administration
        {
            path:
                "users",
            element:
                <UsersPage />
        },


        {
            path:
             "roles",
             element:
                <RolesPage />
        },
        {
  path:
    "roles/permissions",

  element:
    <RolePermissionAssignment />,
},
        {
            path:
                "permissions",
             element:
                <PermissionsPage />   

        },
        {
  path: "settings",
  element: <SettingsPage />
},
        {
            path:
                "users/create",
            element:
               <CreateUser />
        },
        {
  path:
    "users/:id/roles",

  element:
    <AssignRoles />,
},
        {
  path: "users/:id",
  element: <UserDetails />,
},
{
  path: "users/edit/:id",
  element: <EditUser />,
},
{
  path: "services",
  element: <ServicesPage />
},
{
  path: "services/create",
  element: <CreateService />
},
{
  path: "services/:id",
  element: <ServiceDetails />
},
{
  path: "services/edit/:id",
  element: <EditService />
},
{
  path: "attendance/dashboard",
  element: <AttendanceDashboard />
},
{
  path: "attendance/register",
  element: <AttendanceRegister />
},
{
  path: "attendance/checkin",
  element: <ManualCheckIn />
},
{
  path: "attendance/reports",
  element: <AttendanceReports />
}
      ],
    },
    {
  path: "/portal",

  element: (
    <MemberRoute>
    <MemberPortalLayout />
    </MemberRoute>
  ),

  children: [
    {
      index: true,
      element:
        <MemberDashboard />,
    },

    {
      path: "profile",
      element:
        <MyProfile />,
    },
    {
      path: "settings/change-password",
      element:
      <ChangePasswordPage/>
    }
    ,
    {
      path: "attendance",
      element:
        <MyAttendance />,
    },

    {
      path: "checkin",
      element:
        <CheckIn />,
    },

    // {
    //   path: "services",
    //   element:
    //     <UpcomingServices />,
    // },
  ]
},
    {
      path: "*",

      element:
        <Navigate
          to="/"
          replace
        />,
    },
  ]);