import type { Profile } from '../../types/profile'
import location from './location'
import languages from './languages'
import activities from './activities'
import links from './links'
import experiences from './experiences'
import education from './education'
import interests from './interests'
import jobs from './jobs'

const profile: Profile = {
  name: 'Laurensius Jeffrey Chandra',
  nickname: ['Jeff', 'Skiddle'],
  role: [
    'Software Engineer',
    'Open Source Contributor',
    'Investor',
    'Stock Trader'
  ],
  city: location.city,
  country: location.country,
  timezone: location.timezone,
  currentStatus: 'Available',
  languages: Object.keys(languages),
  activities: activities.map(a => a.name),
  currentJobs: jobs.map(job => ({
    company: job.company,
    title: job.title,
    location: job.location
  })),
  links
}

export {
  profile as default,
  location,
  languages,
  activities,
  links,
  experiences,
  education,
  interests,
  jobs
}
