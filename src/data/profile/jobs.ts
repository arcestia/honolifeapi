import type { Job } from '../../types/profile'
import experiences from './experiences'

// Filter current jobs (no endDate or endDate is 'Present')
const jobs: Job[] = experiences
  .filter(exp => !exp.endDate || exp.endDate === 'Present')
  .map(exp => ({
    company: exp.company,
    title: exp.title,
    type: exp.type,
    location: exp.location,
    startDate: exp.startDate,
    endDate: exp.endDate,
    description: exp.description,
    technologies: exp.technologies
  }))

export default jobs
