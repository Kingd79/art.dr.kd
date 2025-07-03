import { Exercise } from '../types';

export const exerciseDatabase: Exercise[] = [
  // Chest Exercises
  {
    id: 'chest-1',
    name: 'Push-ups',
    category: 'Compound',
    bodyPart: ['chest', 'shoulders', 'triceps'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Classic bodyweight exercise for chest, shoulders, and triceps',
    instructions: [
      'Start in plank position with hands slightly wider than shoulders',
      'Lower body until chest nearly touches floor',
      'Push back up to starting position',
      'Keep core tight throughout movement'
    ],
    tips: [
      'Keep body in straight line',
      'Don\'t let hips sag',
      'Control the descent'
    ],
    musclesWorked: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    imageUrl: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg',
    videoUrl: 'https://example.com/pushups'
  },
  {
    id: 'chest-2',
    name: 'Dumbbell Bench Press',
    category: 'Compound',
    bodyPart: ['chest', 'shoulders', 'triceps'],
    equipment: ['Dumbbells', 'Bench'],
    difficulty: 'intermediate',
    description: 'Effective chest builder using dumbbells',
    instructions: [
      'Lie on bench with dumbbells in each hand',
      'Start with arms extended above chest',
      'Lower weights to chest level',
      'Press back up to starting position'
    ],
    tips: [
      'Keep shoulder blades retracted',
      'Control the weight',
      'Full range of motion'
    ],
    musclesWorked: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    imageUrl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    videoUrl: 'https://example.com/dumbbell-bench'
  },

  // Back Exercises
  {
    id: 'back-1',
    name: 'Pull-ups',
    category: 'Compound',
    bodyPart: ['back', 'biceps'],
    equipment: ['Pull-up Bar'],
    difficulty: 'intermediate',
    description: 'Excellent upper body pulling exercise',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Pull body up until chin clears bar',
      'Lower with control to full arm extension',
      'Repeat for desired reps'
    ],
    tips: [
      'Engage lats throughout movement',
      'Avoid swinging',
      'Full range of motion'
    ],
    musclesWorked: ['Latissimus Dorsi', 'Rhomboids', 'Biceps'],
    imageUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
    videoUrl: 'https://example.com/pullups'
  },
  {
    id: 'back-2',
    name: 'Dumbbell Rows',
    category: 'Compound',
    bodyPart: ['back', 'biceps'],
    equipment: ['Dumbbells'],
    difficulty: 'beginner',
    description: 'Great exercise for building back strength',
    instructions: [
      'Bend over with dumbbell in one hand',
      'Support yourself with other hand on bench',
      'Pull dumbbell to hip level',
      'Lower with control'
    ],
    tips: [
      'Keep back straight',
      'Squeeze shoulder blades',
      'Control the weight'
    ],
    musclesWorked: ['Latissimus Dorsi', 'Rhomboids', 'Rear Deltoids'],
    imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    videoUrl: 'https://example.com/dumbbell-rows'
  },

  // Leg Exercises
  {
    id: 'legs-1',
    name: 'Squats',
    category: 'Compound',
    bodyPart: ['legs', 'glutes'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Fundamental lower body exercise',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower body as if sitting back into chair',
      'Keep chest up and knees tracking over toes',
      'Return to standing position'
    ],
    tips: [
      'Keep weight on heels',
      'Don\'t let knees cave in',
      'Go as low as mobility allows'
    ],
    musclesWorked: ['Quadriceps', 'Glutes', 'Hamstrings'],
    imageUrl: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg',
    videoUrl: 'https://example.com/squats'
  },
  {
    id: 'legs-2',
    name: 'Lunges',
    category: 'Compound',
    bodyPart: ['legs', 'glutes'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Unilateral leg exercise for strength and balance',
    instructions: [
      'Step forward into lunge position',
      'Lower back knee toward ground',
      'Keep front knee over ankle',
      'Push back to starting position'
    ],
    tips: [
      'Keep torso upright',
      'Don\'t let front knee drift forward',
      'Control the movement'
    ],
    musclesWorked: ['Quadriceps', 'Glutes', 'Hamstrings'],
    imageUrl: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg',
    videoUrl: 'https://example.com/lunges'
  },

  // Shoulder Exercises
  {
    id: 'shoulders-1',
    name: 'Overhead Press',
    category: 'Compound',
    bodyPart: ['shoulders', 'triceps'],
    equipment: ['Dumbbells'],
    difficulty: 'intermediate',
    description: 'Excellent shoulder and tricep builder',
    instructions: [
      'Stand with dumbbells at shoulder level',
      'Press weights overhead until arms are extended',
      'Lower with control to starting position',
      'Keep core engaged throughout'
    ],
    tips: [
      'Don\'t arch back excessively',
      'Press in straight line',
      'Control the descent'
    ],
    musclesWorked: ['Deltoids', 'Triceps', 'Upper Chest'],
    imageUrl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
    videoUrl: 'https://example.com/overhead-press'
  },

  // Core Exercises
  {
    id: 'core-1',
    name: 'Plank',
    category: 'Isometric',
    bodyPart: ['core'],
    equipment: ['Bodyweight'],
    difficulty: 'beginner',
    description: 'Isometric core strengthening exercise',
    instructions: [
      'Start in push-up position',
      'Hold body in straight line',
      'Keep core tight and breathe normally',
      'Hold for desired time'
    ],
    tips: [
      'Don\'t let hips sag',
      'Keep head neutral',
      'Breathe steadily'
    ],
    musclesWorked: ['Rectus Abdominis', 'Transverse Abdominis', 'Obliques'],
    imageUrl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
    videoUrl: 'https://example.com/plank'
  },

  // Arms Exercises
  {
    id: 'arms-1',
    name: 'Dumbbell Curls',
    category: 'Isolation',
    bodyPart: ['biceps'],
    equipment: ['Dumbbells'],
    difficulty: 'beginner',
    description: 'Classic bicep isolation exercise',
    instructions: [
      'Stand with dumbbells at sides',
      'Curl weights up toward shoulders',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    tips: [
      'Keep elbows stationary',
      'Don\'t swing the weights',
      'Full range of motion'
    ],
    musclesWorked: ['Biceps Brachii', 'Brachialis'],
    imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    videoUrl: 'https://example.com/dumbbell-curls'
  },
  {
    id: 'arms-2',
    name: 'Tricep Dips',
    category: 'Compound',
    bodyPart: ['triceps'],
    equipment: ['Bodyweight', 'Chair'],
    difficulty: 'intermediate',
    description: 'Bodyweight exercise for triceps',
    instructions: [
      'Sit on edge of chair with hands gripping edge',
      'Slide forward off chair',
      'Lower body by bending elbows',
      'Push back up to starting position'
    ],
    tips: [
      'Keep elbows close to body',
      'Don\'t go too low',
      'Control the movement'
    ],
    musclesWorked: ['Triceps Brachii', 'Anterior Deltoids'],
    imageUrl: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg',
    videoUrl: 'https://example.com/tricep-dips'
  }
];