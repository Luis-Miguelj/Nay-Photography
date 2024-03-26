'use client'
import { useEffect, useState } from 'react'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConnection'

interface DatabaseProps {
  id: string
  title: string
  description: string
  imagens: [{ photos: string }]
  created: string
}

export function Database() {
  const [item, setItem] = useState<DatabaseProps[]>([])

  useEffect(() => {
    const itemRef = collection(db, 'blog-photos')
    const itemQuery = query(itemRef, orderBy('created', 'asc'))

    const unsub = onSnapshot(itemQuery, (snapshot) => {
      const items: DatabaseProps[] = []

      snapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          imagens: doc.data().imagens,
          created: doc.data().created,
        })
        // console.log(items)
        setItem(items)
      })
    })

    return () => {
      // console.log('ok')
      unsub()
    }
  }, [])

  // console.log(item)

  return { item }
}
