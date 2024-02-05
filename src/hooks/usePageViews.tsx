import React from "react"
import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  where,
  query,
  addDoc,
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyBbEdLB6dugoO7Dde4I1CZ5RUdSUVfb2PE",
  authDomain: "simple-regex-website.firebaseapp.com",
  projectId: "simple-regex-website",
  storageBucket: "simple-regex-website.appspot.com",
  messagingSenderId: "561519319922",
  appId: "1:561519319922:web:2bc4e869bbef6d1c11dbeb",
}

let app, db

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
}

export default function usePageViews(slug: string): { count: number } {
  const [viewsCount, setViewsCount] = React.useState<null | number>(null)
  const [currentDocId, setCurrentDocId] = React.useState<null | string>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    async function getViews() {
      const viewsRef = collection(db, "views")
      const q = query(viewsRef, where("slug", "==", slug))

      const querySnapshot = await getDocs(q)

      let currentDoc
      querySnapshot.forEach(item => {
        currentDoc = {
          id: item.id,
          ...item.data(),
        }
      })

      if (currentDoc) {
        setViewsCount(currentDoc.count + 1)
      } else {
        const newDoc = await addDoc(collection(db, "views"), {
          slug,
          count: 1,
        })
        setViewsCount(1)
        currentDoc = newDoc
      }

      setCurrentDocId(currentDoc.id)
    }

    getViews()
  }, [])

  React.useEffect(() => {
    let isDev = false

    try {
      if (process.env.NODE_ENV === "development") isDev = true
    } catch (err) {}

    if (isDev) return

    if (!viewsCount && !currentDocId) return

    async function updateViews() {
      const heightOfFullPage = document.body.scrollHeight
      const heightOfScreen = window.innerHeight
      const currentScroll = window.scrollY + heightOfScreen

      if (currentScroll > heightOfFullPage / 2) {
        // record a page view after half scrolling
        window.removeEventListener("scroll", updateViews)

        await setDoc(doc(db, "views", currentDocId as string), {
          slug,
          count: viewsCount,
        })
      }
    }

    window.addEventListener("scroll", updateViews)

    return () => window.removeEventListener("scroll", updateViews)
  }, [viewsCount, currentDocId])

  return { count: viewsCount as number }
}
