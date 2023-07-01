/**
 * 实体列表类型
 */
export type ServiceStatusItemListResult = ServiceStatusItem[];

/**
 * 实体列表项
 */
export interface ServiceStatusItem {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  modelName: string;
  modelType: string;
  applicationName: string;
  activeTime: number;
  currentTime: number;
  timeout: number;
  active: boolean;
  jsonTxt?: string;
}

