'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type UpdateStatusState = { message?: string } | undefined

export async function updateChecklistStatusAction(
  _state: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  const id = formData.get('id') as string
  const status = formData.get('status') as string

  if (!id || !status) return { message: 'Dados inválidos.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Sessão expirada. Faça login novamente.' }

  const { error } = await supabase
    .from('checklists')
    .update({ status })
    .eq('id', id)

  if (error) return { message: 'Erro ao atualizar status. Tente novamente.' }

  redirect('/lista-checklist')
}

export async function updateNaoConformidadeStatusAction(
  _state: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  const id = formData.get('id') as string
  const status = formData.get('status') as string

  if (!id || !status) return { message: 'Dados inválidos.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Sessão expirada. Faça login novamente.' }

  const { error } = await supabase
    .from('nao_conformidades')
    .update({ status })
    .eq('id', id)

  if (error) return { message: 'Erro ao atualizar status. Tente novamente.' }

  redirect('/lista-nao-conformidade')
}
