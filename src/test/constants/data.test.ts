import { PROJECTS } from '@/constants/data'
import { describe, expect, it } from 'vitest'

describe('data constants', () => {
  describe('PROJECTS', () => {
    it('exports an array of projects', () => {
      expect(Array.isArray(PROJECTS)).toBe(true)
      expect(PROJECTS.length).toBeGreaterThan(0)
    })

    it('has projects with required fields', () => {
      for (const project of PROJECTS) {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('technologies')
        expect(project).toHaveProperty('featured')

        expect(typeof project.id).toBe('number')
        expect(typeof project.title).toBe('string')
        expect(typeof project.description).toBe('string')
        expect(Array.isArray(project.technologies)).toBe(true)
        expect(typeof project.featured).toBe('boolean')
      }
    })

    it('has projects with non-empty titles', () => {
      for (const project of PROJECTS) {
        expect(project.title.length).toBeGreaterThan(0)
      }
    })

    it('has projects with non-empty descriptions', () => {
      for (const project of PROJECTS) {
        expect(project.description.length).toBeGreaterThan(0)
      }
    })

    it('has projects with unique IDs', () => {
      const ids = PROJECTS.map(project => project.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('has at least one featured project', () => {
      const featuredProjects = PROJECTS.filter(project => project.featured)
      expect(featuredProjects.length).toBeGreaterThan(0)
    })

    it('has projects with technologies', () => {
      for (const project of PROJECTS) {
        expect(project.technologies.length).toBeGreaterThan(0)
        for (const tech of project.technologies) {
          expect(typeof tech).toBe('string')
          expect(tech.length).toBeGreaterThan(0)
        }
      }
    })
  })
})
