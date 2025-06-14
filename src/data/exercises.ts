import { Exercise } from '../types';

export const exerciseDatabase: Exercise[] = [
  {
    id: 'knee-1',
    name: 'Straight Leg Raises',
    description: 'Strengthen quadriceps muscles without stressing the knee joint',
    category: 'Knee Rehabilitation',
    difficulty: 'Beginner',
    duration: 10,
    sets: 3,
    reps: 15,
    instructions: [
      'Lie on your back with one leg bent and foot flat on the floor',
      'Keep the other leg straight and lift it to the height of the bent knee',
      'Hold for 3 seconds, then slowly lower',
      'Repeat with the same leg before switching'
    ],
    targetMuscles: ['Quadriceps', 'Hip Flexors'],
    equipment: ['Mat'],
    videoUrl: 'https://example.com/video/straight-leg-raises',
    animationUrl: 'https://example.com/animation/straight-leg-raises'
  },
  {
    id: 'back-1',
    name: 'Cat-Cow Stretch',
    description: 'Improve spinal flexibility and reduce lower back tension',
    category: 'Lower Back',
    difficulty: 'Beginner',
    duration: 5,
    sets: 2,
    reps: 10,
    instructions: [
      'Start on hands and knees in tabletop position',
      'Arch your back and look up (Cow pose)',
      'Round your spine toward the ceiling (Cat pose)',
      'Move slowly between positions, coordinating with breath'
    ],
    targetMuscles: ['Erector Spinae', 'Abdominals', 'Latissimus Dorsi'],
    equipment: ['Mat'],
    videoUrl: 'https://example.com/video/cat-cow',
    animationUrl: 'https://example.com/animation/cat-cow'
  },
  {
    id: 'shoulder-1',
    name: 'Wall Push-Ups',
    description: 'Gentle strengthening exercise for shoulder rehabilitation',
    category: 'Shoulder Rehabilitation',
    difficulty: 'Beginner',
    duration: 8,
    sets: 2,
    reps: 12,
    instructions: [
      'Stand arm\'s length from a wall',
      'Place palms flat against wall at shoulder height',
      'Lean in toward wall, then push back to starting position',
      'Keep body straight throughout movement'
    ],
    targetMuscles: ['Pectorals', 'Anterior Deltoids', 'Triceps'],
    equipment: ['Wall'],
    videoUrl: 'https://example.com/video/wall-pushups',
    animationUrl: 'https://example.com/animation/wall-pushups'
  },
  {
    id: 'core-1',
    name: 'Dead Bug',
    description: 'Core stabilization exercise that improves coordination',
    category: 'Core Strengthening',
    difficulty: 'Intermediate',
    duration: 8,
    sets: 3,
    reps: 10,
    instructions: [
      'Lie on back with arms extended toward ceiling',
      'Lift knees to 90 degrees',
      'Slowly lower opposite arm and leg toward floor',
      'Return to starting position and alternate sides'
    ],
    targetMuscles: ['Deep Abdominals', 'Hip Flexors', 'Multifidus'],
    equipment: ['Mat'],
    videoUrl: 'https://example.com/video/dead-bug',
    animationUrl: 'https://example.com/animation/dead-bug'
  },
  {
    id: 'ankle-1',
    name: 'Ankle Circles',
    description: 'Improve ankle mobility and reduce stiffness',
    category: 'Ankle Rehabilitation',
    difficulty: 'Beginner',
    duration: 3,
    sets: 2,
    reps: 10,
    instructions: [
      'Sit comfortably with leg extended',
      'Slowly rotate ankle in clockwise direction',
      'Complete full circles, then reverse direction',
      'Keep movement slow and controlled'
    ],
    targetMuscles: ['Ankle Stabilizers', 'Calf Muscles'],
    equipment: ['Chair'],
    videoUrl: 'https://example.com/video/ankle-circles',
    animationUrl: 'https://example.com/animation/ankle-circles'
  },
  {
    id: 'hip-1',
    name: 'Hip Bridges',
    description: 'Strengthen glutes and improve hip stability',
    category: 'Hip Strengthening',
    difficulty: 'Beginner',
    duration: 6,
    sets: 3,
    reps: 15,
    instructions: [
      'Lie on back with knees bent, feet flat on floor',
      'Squeeze glutes and lift hips off the ground',
      'Form straight line from knees to shoulders',
      'Hold for 2 seconds, then lower slowly'
    ],
    targetMuscles: ['Glutes', 'Hamstrings', 'Core'],
    equipment: ['Mat'],
    videoUrl: 'https://example.com/video/hip-bridges',
    animationUrl: 'https://example.com/animation/hip-bridges'
  }
];