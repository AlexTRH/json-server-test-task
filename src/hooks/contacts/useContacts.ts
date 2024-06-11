import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { client } from '@/api'
import { Contact } from '@/types'

export enum EQuery {
  Contacts = 'contacts',
}

const invalidateContactsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries(EQuery.Contacts)
}

type ContactsDTO = Contact[]

export const useContacts = () =>
  useQuery(
    [EQuery.Contacts],
    async () => {
      const { data } = await client.get<ContactsDTO>('/contacts')
      return data
    },
    {
      onError: (error) => {
        console.error('An error occurred while fetching contacts:', error)
      },
    },
  )

export const useCreateContact = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (payload: Partial<Contact>) => {
      const { data } = await client.post('/contacts', { ...payload })
      return data
    },
    {
      onSuccess: () => {
        invalidateContactsQuery(queryClient)
      },
      onError: (error) => {
        console.error('An error occurred while creating contact:', error)
      },
    },
  )
}

export const useUpdateContact = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (updatedContact: Contact) => {
      if (!updatedContact) return
      return client.put(`/contacts/${updatedContact.id}`, updatedContact)
    },
    {
      onSuccess: () => {
        invalidateContactsQuery(queryClient)
      },
      onError: (error) => {
        console.error('An error occurred while updating contact:', error)
      },
    },
  )
}

export const useDeleteContact = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (contactId: number) => {
      return client.delete(`/contacts/${contactId}`)
    },
    {
      onSuccess: () => {
        invalidateContactsQuery(queryClient)
      },
      onError: (error) => {
        console.error('An error occurred while deleting contact:', error)
      },
    },
  )
}
