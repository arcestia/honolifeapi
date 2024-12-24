export interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience: number
  description?: string
}

export interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
}
