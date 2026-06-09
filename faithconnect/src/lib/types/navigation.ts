import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  path?: string;
  permission?: string;
  icon: LucideIcon;
  roles: string[];
  children?: MenuItem[];
}