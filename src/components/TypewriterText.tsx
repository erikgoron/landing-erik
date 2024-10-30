'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  words: string[]
  baseText: string
  prefixText: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypewriterText({
  words,
  baseText,
  prefixText,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [text, setText] = useState(words[0].toUpperCase())
  const [notText, setNotText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isTypingNot, setIsTypingNot] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const timer = setTimeout(() => {
      if (text === '.' && !isTypingNot) {
        setIsTypingNot(true)
        setText('')
        setNotText('N')
        return
      }

      if (isTypingNot) {
        const fullText = 'NOT an AI ;)'
        if (notText.length < fullText.length) {
          setNotText(fullText.substring(0, notText.length + 1))
        } else {
          setTimeout(() => {
            setIsTypingNot(false)
            setNotText('')
            setIsDeleting(false)
            setWordIndex((current) => (current + 1) % words.length)
          }, pauseDuration)
        }
        return
      }

      const currentWord = words[wordIndex].toUpperCase()
      
      if (isDeleting) {
        setText(current => current.substring(0, current.length - 1))
        if (text === '') {
          setIsDeleting(false)
          setWordIndex((current) => (current + 1) % words.length)
        }
      } else {
        setText(currentWord.substring(0, text.length + 1))
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [text, notText, wordIndex, isDeleting, isTypingNot, words, typingSpeed, deletingSpeed, pauseDuration, isMounted, prefixText])

  if (!isMounted) {
    return (
      <span>
        {baseText}
        <span className="text-accent font-bold">{prefixText}</span>{" "}
        <span className="text-accent font-bold">{words[0].toUpperCase()}</span>
      </span>
    )
  }

  return (
    <span>
      {baseText}
      {isTypingNot ? (
        <span className="text-accent font-bold">{notText}</span>
      ) : (
        <span>
          <span className="text-accent font-bold">{prefixText} </span>{" "}
          <span className="text-accent font-bold">{text}</span>
        </span>
      )}
    </span>
  )
}