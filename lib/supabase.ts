import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  bio?: string
  location?: string
  availability: string
  rating: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  user_id: string
  name: string
  type: 'offered' | 'wanted'
  created_at: string
}

export interface SwapRequest {
  id: string
  from_user_id: string
  to_user_id: string
  skill_offered: string
  skill_wanted: string
  message?: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
  from_user?: User
  to_user?: User
}

// Auth functions
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  })
  
  if (error) throw error
  
  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: data.user.id,
          email: data.user.email,
          name,
          availability: 'Flexible',
          rating: 0
        }
      ])
    
    if (profileError) throw profileError
  }
  
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// User functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) throw error
  return profile
}

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getAllUsers = async (excludeUserId?: string) => {
  let query = supabase
    .from('users')
    .select(`
      *,
      skills_offered:skills!skills_user_id_fkey(name),
      skills_wanted:skills!skills_user_id_fkey(name)
    `)
  
  if (excludeUserId) {
    query = query.neq('id', excludeUserId)
  }
  
  const { data, error } = await query
  if (error) throw error
  
  return data?.map(user => ({
    ...user,
    skillsOffered: user.skills_offered?.filter(s => s.type === 'offered').map(s => s.name) || [],
    skillsWanted: user.skills_wanted?.filter(s => s.type === 'wanted').map(s => s.name) || []
  }))
}

export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      skills(name, type)
    `)
    .eq('id', userId)
    .single()
  
  if (error) throw error
  
  return {
    ...data,
    skillsOffered: data.skills?.filter(s => s.type === 'offered').map(s => s.name) || [],
    skillsWanted: data.skills?.filter(s => s.type === 'wanted').map(s => s.name) || []
  }
}

// Skills functions
export const updateUserSkills = async (userId: string, skillsOffered: string[], skillsWanted: string[]) => {
  // Delete existing skills
  await supabase
    .from('skills')
    .delete()
    .eq('user_id', userId)
  
  // Insert new skills
  const skillsToInsert = [
    ...skillsOffered.map(skill => ({ user_id: userId, name: skill, type: 'offered' as const })),
    ...skillsWanted.map(skill => ({ user_id: userId, name: skill, type: 'wanted' as const }))
  ]
  
  if (skillsToInsert.length > 0) {
    const { error } = await supabase
      .from('skills')
      .insert(skillsToInsert)
    
    if (error) throw error
  }
}

// Swap request functions
export const createSwapRequest = async (request: Omit<SwapRequest, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('swap_requests')
    .insert([request])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getReceivedRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from('swap_requests')
    .select(`
      *,
      from_user:users!swap_requests_from_user_id_fkey(*)
    `)
    .eq('to_user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getSentRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from('swap_requests')
    .select(`
      *,
      to_user:users!swap_requests_to_user_id_fkey(*)
    `)
    .eq('from_user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateRequestStatus = async (requestId: string, status: 'accepted' | 'rejected') => {
  const { data, error } = await supabase
    .from('swap_requests')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', requestId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Upload avatar
export const uploadAvatar = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}.${fileExt}`
  
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true })
  
  if (uploadError) throw uploadError
  
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName)
  
  return data.publicUrl
}