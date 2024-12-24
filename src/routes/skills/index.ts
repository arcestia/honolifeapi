import { Hono } from 'hono'
import type { Skill, SkillCategory } from '../../types/skills'
import skills from '../../data/skills'

const app = new Hono()

// Get all skills
app.get('/', (c) => {
  const totalSkills = skills.categories.reduce((total, cat) => total + cat.skills.length, 0)
  return c.json({
    categories: skills.categories,
    totalSkills
  })
})

// Get skills by category
app.get('/:category', (c) => {
  const category = c.req.param('category').toLowerCase()
  const skillCategory = skills.categories.find(
    cat => cat.name.toLowerCase() === category
  )

  if (!skillCategory) {
    return c.json({ error: 'Category not found' }, 404)
  }

  return c.json(skillCategory)
})

export default app
