import { useState, useEffect } from 'react'

export default function Home() {
//   const [session, setSession] = useState(null)

  useEffect(() => {
    // setSession(supabase.auth.session())

    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session)
    // })
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      Welcome
    </div>
  )
}