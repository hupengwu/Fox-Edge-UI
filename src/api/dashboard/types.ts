/**
 * 指标信息
 */
export interface Indicator {
  deviceSuccessCount: number;
  deviceTypeCount: number;
  deviceFailedCount: number;
  cpuId: string;
  deviceTotalCount: number;
  channelTotalCount: number;
  channelTypeCount: number;
  serviceActiveCount: number;
  objectTotalCount: number;
  diskSizeTxt: string;
  diskUsed: number;
  diskAvail: number;
  ramTotalTxt: string;
  ramUsed: number;
  ramFree: number;
  swapTotalTxt: string;
  swapUsed: number;
  swapFree: number;
}
