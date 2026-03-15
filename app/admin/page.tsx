"use client"

import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">

      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <p className="text-gray-400 mb-10">
        Manage support tickets and users
      </p>

      <div className="flex gap-6">

        <Link
          href="/admin/tickets"
          className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Manage Tickets
        </Link>

      </div>

    </div>
  )
}