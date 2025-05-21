import { useTheme } from '../context/ThemeContext';
import { useUserProfile } from '../context/UserProfileContext';
import { useWorkout } from '../context/WorkoutContext';

export const useApp = () => {
  const theme = useTheme();
  const userProfile = useUserProfile();
  const workout = useWorkout();

  return {
    ...theme,
    ...userProfile,
    ...workout,
  };
};