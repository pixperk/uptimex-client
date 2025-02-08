import { ISSLInfo, ISSLMonitorDocument, IUseSSLInfoModal, sslDefaultInfoData, SSLModalDataProp } from "@/interfaces/ssl.interface";
import { format, parseISO, isValid } from "date-fns";

export const useSSLInfoModal = (monitor: ISSLMonitorDocument): IUseSSLInfoModal => {
  const sslInfo: ISSLInfo = monitor.info ? JSON.parse(monitor.info) : sslDefaultInfoData;

  const hostInfo: SSLModalDataProp[] = [{ key: "Name", value: sslInfo.host || "N/A" }];

  const subjectInfo: SSLModalDataProp[] = [
    { key: "Valid for Domains", value: sslInfo.subject?.common_name || "N/A" },
    { key: "Subject Alternative Name (SAN)", value: sslInfo.subject?.sans || "N/A" },
  ];

  const issuerInfo: SSLModalDataProp[] = [
    { key: "Common Name (CN)", value: sslInfo.issuer?.common_name || "N/A" },
    { key: "Organization (O)", value: sslInfo.issuer?.org || "N/A" },
    { key: "Country (C)", value: sslInfo.issuer?.country || "N/A" },
  ];

  const validityInfo: SSLModalDataProp[] = [
    { key: "Issue Date", value: formatDate(sslInfo.info?.validFrom) },
    { key: "Expiry Date", value: formatDate(sslInfo.info?.validTo) },
    { key: "Days Left", value: sslInfo.info?.daysLeft !== undefined ? `${sslInfo.info.daysLeft}` : "N/A" },
  ];

  function formatDate(date?: string): string {
    if (!date) {
      return "N/A";
    }
    const parsedDate = parseISO(date);
    return isValid(parsedDate) ? format(parsedDate, "MMM d, yyyy h:mm a") : "N/A";
  }

  return {
    sslInfo,
    hostInfo,
    subjectInfo,
    issuerInfo,
    validityInfo,
    formatDate,
  };
};
