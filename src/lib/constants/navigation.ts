import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  UsersIcon,
  Mail,
  Settings,
  Shield, 
} from "lucide-react";

import type { MenuItem } from "../types/navigation";

export const navigation: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ChurchAdmin", "Pastor"],
  },

  {
    title: "Membership",
    icon: Users,
    roles: ["ChurchAdmin"],

    children: [
      {
        title: "Members",
        path: "members",
        icon: Users,
        roles: ["ChurchAdmin"],
      },

      {
        title: "Bulk Upload",
        path: "members/bulk-upload",
        icon: Users,
        roles: ["ChurchAdmin"],
      },
    ],
  },
{
  title: "Departments",
  icon: UsersIcon,
   roles: ["ChurchAdmin", "Pastor"],
  path: "departments",
  permission:
    "ManageDepartments",
},
  {
    title: "Attendance",
    icon: Calendar,
    roles: ["ChurchAdmin", "SuperAdmin", "Pastor"],

    
  children: [
    {
      title: "Dashboard",
      path:
        "/attendance/dashboard",
         icon: Calendar,
        roles: ["ChurchAdmin", "Pastor"],
    },
    {
      title: "Register",
      path:
        "/attendance/register",
         icon: Calendar,
        roles: ["ChurchAdmin", "Pastor"],
    },
    {
      title: "Manual Check-In",
      path:
        "/attendance/checkin",
         icon: Calendar,
        roles: ["ChurchAdmin", "Pastor"],
    },
    {
      title: "Reports",
      path:
        "/attendance/reports",
         icon: Calendar,
        roles: ["ChurchAdmin", "Pastor"],
    },
  

      {
        title: "Services",
        path: "services",
        icon: Calendar,
        roles: ["ChurchAdmin", "Pastor"],
      },

    //   {
    //     title: "Attendance",
    //     path: "attendance",
    //     icon: Calendar,
    //     roles: ["ChurchAdmin", "Pastor"],
    //   },

    //   {
    //     title: "Reports",
    //     path: "attendance/reports",
    //     icon: Calendar,
    //     roles: ["ChurchAdmin", "Pastor"],
    //   },
    ],
  },

  {
  title: "Communications",
  icon: MessageSquare,
        roles: ["ChurchAdmin", "Pastor"],
  children: [
    {
      title: "Bulk SMS",
      path: "communications/sms",
      icon: MessageSquare,
        roles: ["ChurchAdmin", "Pastor"],
    },
    {
      title: "Bulk Email",
      path: "communications/email",
      icon: Mail,
        roles: ["ChurchAdmin", "Pastor"],
    },
    {
      title: "Templates",
      path: "communications/templates",
      icon: MessageSquare,
        roles: ["ChurchAdmin", "Pastor"],
    },
    {
      title: "History",
      path: "communications/history",
      icon: MessageSquare,
        roles: ["ChurchAdmin", "Pastor"],
    },
  ],
},

  {
    title: "Administration",
    icon: Shield,
    roles: ["ChurchAdmin"],

    children: [
      {
        title: "Users",
        path: "users",
        icon: Shield,
        roles: ["ChurchAdmin"],
      },

      {
        title: "Roles",
        path: "roles",
        icon: Shield,
        roles: ["ChurchAdmin"],
      },
      {
  title:
    "Role Permissions",

  path:
    "roles/permissions",
    icon: Shield,
    roles:  ["ChurchAdmin"],
},
      {
      title: "Permissions",
      path: "permissions",
      icon: Shield,
      roles: ["ChurchAdmin"]
    },

    //   {
    //     title: "Settings",
    //     path: "settings",
    //     icon: Settings,
    //     roles: ["ChurchAdmin"],
    //   },
    ],
  },

  {
        title: "Settings",
        path: "settings",
        icon: Settings,
        roles: ["ChurchAdmin"],
      },
];