export interface CreateServiceDto {
  name: string;
  serviceType: number;

  serviceDate: string;

  startTime: string;

  lateThreshold: string;

  attendanceCloseTime: string;

  latitude: number;

  longitude: number;

  allowedRadiusMeters: number;

  attendanceEnabled: boolean;
}

export interface Service {
  id: string;

  name: string;

  serviceType: number;

  serviceDate: string;

  startTime: string;

  lateThreshold: string;

  attendanceCloseTime: string;

  latitude: number;

  longitude: number;

  allowedRadiusMeters: number;

  attendanceEnabled: boolean;

  attendanceCount: number;
}