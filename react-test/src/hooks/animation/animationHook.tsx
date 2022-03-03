import { useEffect, useState } from "react";

export function useAnimationByStateTransition(newAnimationState: boolean|undefined) {
  const [currentAnimationState, setCurrentAnimationState] = useState<boolean|undefined>(newAnimationState);

  const [stateTransition, setStateTransition] = useState<boolean>(false);

  const transitionExists = (): boolean => {
    return (
      currentAnimationState !== undefined && 
      newAnimationState !== undefined && 
      currentAnimationState !== newAnimationState
    )
  }

  useEffect(() => {
    if(newAnimationState || transitionExists()) {
        setStateTransition(true);
    }
    setCurrentAnimationState(newAnimationState);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAnimationState, newAnimationState])

  return {stateTransition}
}