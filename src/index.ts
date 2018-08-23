export { EmotionProvider } from './context'
export { injectEmotion } from './injector'
import { CreateStyled } from './typings/react'
// @ts-ignore
import { styled as baseStyled } from './styled'

export const styled: CreateStyled = baseStyled
