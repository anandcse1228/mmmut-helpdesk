"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {

    const loggedIn = sessionStorage.getItem("loggedIn")

    if (!loggedIn) {
      router.replace("/login")
    } else {
      setChecked(true)
    }

  }, [router])

  if (!checked) return null

  return <>{children}</>
}