export { EmotionProvider } from './context'
export { injectEmotion } from './injector'
export * from './typings/react'
import { CreateStyled } from './typings/react'
// @ts-ignore
import { styled as baseStyled } from './styled'

export const styled: CreateStyled = baseStyled
