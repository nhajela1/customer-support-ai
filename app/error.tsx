"use client"

import { useEffect } from "react"

export default function RootErrorBoundary({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    
    return (
        <main>
            <h1>Something went wrong</h1>
        </main>
    )
}