'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type LoginState = { message?: string } | undefined

export async function loginAction(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { message: 'Preencha todos os campos.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { message: 'Email ou senha incorretos.' }
  }

  redirect('/home')
}

export type SignupState =
  | { message?: string; success?: boolean }
  | undefined

export async function signupAction(
  _state: SignupState,
  formData: FormData
): Promise<SignupState> {
  const nome = (formData.get('nome') as string)?.trim()
  const setor = formData.get('setor') as string
  const funcao = formData.get('funcao') as string
  const username = (formData.get('username') as string)?.trim().toLowerCase()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!nome || !setor || !funcao || !username || !email || !password) {
    return { message: 'Preencha todos os campos.' }
  }

  if (password.length < 6) {
    return { message: 'A senha deve ter no mínimo 6 caracteres.' }
  }

  const supabase = await createClient()

  // Check username uniqueness
  const { data: existing } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle()

  if (existing) {
    return { message: 'Nome de usuário já está em uso.' }
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError || !authData.user) {
    if (authError?.message?.includes('already registered')) {
      return { message: 'Este email já possui uma conta.' }
    }
    return { message: authError?.message ?? 'Erro ao criar conta.' }
  }

  // Insert profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    nome,
    username,
    setor,
    funcao,
    email,
  })

  if (profileError) {
    return { message: 'Erro ao salvar perfil. Tente novamente.' }
  }

  return { success: true }
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export type UpdateProfileState = { message?: string; success?: boolean } | undefined

export async function updateProfileAction(
  _state: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const username = (formData.get('username') as string)?.trim().toLowerCase()
  const email = (formData.get('email') as string)?.trim().toLowerCase()

  if (!username || !email) {
    return { message: 'Preencha todos os campos.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { message: 'Sessão expirada. Faça login novamente.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ username, email })
    .eq('id', user.id)

  if (error) {
    if (error.code === '23505') {
      return { message: 'Nome de usuário já está em uso.' }
    }
    return { message: 'Erro ao atualizar perfil.' }
  }

  return { success: true }
}
