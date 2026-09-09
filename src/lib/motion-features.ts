/**
 * The animation feature bundle, isolated so Vite can split it into its own chunk.
 *
 * `domAnimation` covers everything the design system uses — keyframes, variants,
 * exit animations and hover/tap gestures — and leaves out drag and layout
 * projection, which we do not use.
 */
import { domAnimation } from 'motion/react'

export default domAnimation
