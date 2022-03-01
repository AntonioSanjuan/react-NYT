import './blurAnimation.scss'

export const inBlurAnimation = {
  'pointer-events': "none",
  animation: "inBlurAnimationKeyframe 800ms ease-in",
  animationFillMode: "forwards"
};

export const outBlurAnimation = {
  animation: "outBlurAnimationKeyframe 800ms ease-out",
};