import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are not set. Waitlist submissions will not be saved.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface WaitlistEntry {
  email: string
  is_enterprise: boolean
  is_developer: boolean
  is_just_exploring: boolean
  created_at?: string
}

export async function submitWaitlistEntry(entry: WaitlistEntry) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}


