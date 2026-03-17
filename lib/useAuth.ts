"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (typeof window === "undefined") return

    const loggedIn = sessionStorage.getItem("loggedIn")

    if (!loggedIn) {
      router.replace("/login")
    } else {
      setLoading(false)
    }

  }, [router])

  return { loading }

}