import {
 
  Calendar,
  Users,
} from "lucide-react";

export const memberNavigation = [
  {
    title: "Dashboard",
    path: "/portal"
  },
  {
    title: "My Profile",
    path: "/portal/profile",
    icon: Users,
        roles: ["ChurchAdmin"],
  },
  {
    title: "My Attendance",
    path: "/portal/attendance",
    icon: Calendar,
    roles: [ "Member"]
  },
  {
    title: "Check In",
    path: "/portal/checkin",
     icon: Calendar,
    roles: [ "Member"]
  },
  {
    title: "Services",
    path: "/portal/services",
    icon: Calendar,
        roles: ["Member"],
  }
];