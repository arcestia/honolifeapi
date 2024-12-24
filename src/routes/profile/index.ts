import { Hono } from 'hono'
import profile, { 
  location, 
  languages, 
  activities, 
  links,
  experiences,
  education,
  interests,
  jobs
} from '../../data/profile'

const app = new Hono()

// Get basic profile information
app.get('/', (c) => {
  return c.json(profile)
})

// Get location information
app.get('/location', (c) => {
  return c.json(location)
})

// Get language proficiencies
app.get('/languages', (c) => {
  return c.json(languages)
})

// Get activities
app.get('/activities', (c) => {
  return c.json({
    activities,
    total: activities.length
  })
})

// Get links
app.get('/links', (c) => {
  return c.json({
    links,
    total: Object.keys(links).length
  })
})

// Get work experience
app.get('/experience', (c) => {
  const sortedExperiences = [...experiences].sort((a, b) => {
    // Convert 'Present' to a far future date for comparison
    const aEnd = a.endDate === 'Present' ? '9999-12-31' : a.endDate || a.startDate
    const bEnd = b.endDate === 'Present' ? '9999-12-31' : b.endDate || b.startDate
    
    // Compare end dates first
    if (aEnd !== bEnd) {
      return bEnd.localeCompare(aEnd)
    }
    // If end dates are same, compare start dates
    return b.startDate.localeCompare(a.startDate)
  })

  return c.json({
    experiences: sortedExperiences,
    total: experiences.length
  })
})

// Get current jobs
app.get('/jobs', (c) => {
  return c.json({
    jobs,
    total: jobs.length
  })
})

// Get education history
app.get('/education', (c) => {
  return c.json({
    education,
    total: education.length
  })
})

// Get interests
app.get('/interests', (c) => {
  return c.json({
    interests,
    total: interests.length
  })
})

export default app
