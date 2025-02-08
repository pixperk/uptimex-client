import Button from "@/components/Button"
import type { ISSLMonitorDocument, SSLModalDataProp } from "@/interfaces/ssl.interface"
import type { FC, JSX, ReactElement } from "react"
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa"
import { useSSLInfoModal } from "../hooks/useSSLInfoModal"

type SSLInfoModalProp = { monitor: ISSLMonitorDocument; onClose: () => void }

const SSLInfoModal: FC<SSLInfoModalProp> = ({ monitor, onClose }): ReactElement => {
  const { sslInfo, hostInfo, subjectInfo, issuerInfo, validityInfo, formatDate } = useSSLInfoModal(monitor)

  const renderMessage = (): JSX.Element => {
    if (sslInfo.type === "success") {
      return (
        <div className="flex items-center text-green-600">
          <FaCheckCircle className="mr-2" />
          <span>{`The certificate is valid until ${formatDate(sslInfo.info.validTo!)}`}</span>
        </div>
      )
    }
    if (sslInfo.type === "expiring soon") {
      return (
        <div className="flex items-center text-yellow-600">
          <FaExclamationTriangle className="mr-2" />
          <span>{`The certificate will expire in ${sslInfo.info.daysLeft} day(s).`}</span>
        </div>
      )
    }
    return (
      <div className="flex items-center text-red-600">
        <FaTimesCircle className="mr-2" />
        <span>The certificate is either expired or invalid.</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">SSL Certificate Details</h2>
          <div className="mb-6">{renderMessage()}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CertInfo title="Host" body={hostInfo} />
            <CertInfo title="Subject" body={subjectInfo} />
            <CertInfo title="Issuer" body={issuerInfo} />
            <CertInfo title="Validity" body={validityInfo} />
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <Button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-200"
            label="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}

const CertInfo = ({ title, body }: { title: string; body: SSLModalDataProp[] }): ReactElement => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {body.map((data: SSLModalDataProp, index: number) => (
          <div key={index} className="text-sm">
            <span className="font-medium text-gray-600">{data.key}:</span>
            <span className="ml-2 text-gray-800">{data.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SSLInfoModal

