import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
// TODO: CHECK FOR USER WITH THE SAME USERNAME
export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const display_name = String(formData.get('display_name'))
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        display_name
      }
    },
  })

  const conflict = !!(await supabase.from('profiles').select(`display_name = ${display_name}`));

  if (error || conflict) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Could not authenticate user ${conflict && '(username is already in use)'}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}
