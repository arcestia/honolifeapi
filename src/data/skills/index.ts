import type { SkillCategory } from '../../types/skills'
import languages from './languages'
import frameworks from './frameworks'
import tools from './tools'
import others from './others'

const categories: SkillCategory[] = [
  {
    name: 'Languages',
    description: 'Programming and markup languages',
    skills: languages
  },
  {
    name: 'Frameworks',
    description: 'Web and application frameworks',
    skills: frameworks
  },
  {
    name: 'Tools',
    description: 'Development and productivity tools',
    skills: tools
  },
  {
    name: 'Others',
    description: 'Other technical skills',
    skills: others
  }
]

export default {
  categories
}