export interface Skill {
  name: string
  level: number // 1-5
  description?: string
  icon?: string
  url?: string
}

export interface SkillCategory {
  name: string
  description: string
  skills: Skill[]
}

export interface SkillSet {
  categories: SkillCategory[]
  totalSkills: number
}
