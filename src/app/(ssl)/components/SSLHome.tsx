import type { FC, ReactElement } from "react"
import { useSSLHome } from "../hooks/useSSLHome"
import PageLoader from "@/components/PageLoader"
import Link from "next/link"
import SSLTable from "./SSLTable"
import Paginate from "@/components/Paginate"
import SSLButtonGroup from "./SSLButtonGroup"
import Image from "next/image"
import { FiRefreshCw } from "react-icons/fi"

const SSLHome: FC = (): ReactElement => {
  const { loading, monitors, limit, updateLimit } = useSSLHome()

  const renderEmptyState = () => (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mb-6">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="No SSL tests"
            width={180}
            height={180}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">No SSL Tests Yet</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Start monitoring your SSL certificates by creating your first SSL test.
        </p>
        <Link
          href="/ssl/create"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
          Create New SSL Test
        </Link>
      </div>
    </div>
  )

  if (loading) {
    return <PageLoader />
  }

  if (!monitors.length) {
    return renderEmptyState()
  }

  return (
    <div className="m-auto px-4 sm:px-6 min-h-screen xl:container md:px-12 lg:px-6">
      {/* Top Section */}
      <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <SSLButtonGroup sslMonitors={monitors} />

        <div className="flex gap-3">
          {/* Refresh Button */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center px-4 py-2 text-base font-medium text-white rounded bg-green-400 hover:bg-green-500 transition-colors duration-300"
            aria-label="Refresh page"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>

          {/* New SSL Test Button */}
          <Link
            href="/ssl/create"
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white rounded bg-green-400 hover:bg-green-500 transition-colors duration-300"
          >
            New SSL Test
          </Link>
        </div>
      </div>

      {/* SSL Table */}
      <div className="my-4">
        <SSLTable limit={limit} monitors={monitors} />
      </div>

      {/* Pagination */}
      <div className="my-4">
        <Paginate updateLimit={updateLimit} length={monitors.length} defaultLimit={limit.end} />
      </div>
    </div>
  )
}

export default SSLHome
