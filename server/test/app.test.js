const axios = require('axios')
const url = require('url')
const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const configuration = require('@feathersjs/configuration')

describe('Feathers application', () => {
  const app = express(feathers())
  app.configure(configuration())
  app.use('/', express.static(app.get('public')))

  const port = app.get('port')
  const getUrl = pathname =>
    url.format({
      hostname: app.get('host') || 'localhost',
      protocol: 'http',
      port,
      pathname,
    })

  it('starts and shows the index page', async () => {
    expect.assertions(1)
    const { data } = await axios.get(getUrl())
    expect(data.indexOf('<html lang="en">')).not.toBe(-1)
  })

  describe('404', () => {
    it('shows a 404 HTML page', async () => {
      expect.assertions(2)
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            Accept: 'text/html',
          },
        })
      } catch (error) {
        const { response } = error

        expect(response.status).toBe(404)
        expect(response.data.indexOf('<html>')).not.toBe(-1)
      }
    })

    it('shows a 404 JSON error without stack trace', async () => {
      expect.assertions(4)

      try {
        await axios.get(getUrl('path/to/nowhere'))
      } catch (error) {
        const { response } = error

        expect(response.status).toBe(404)
        expect(response.data.code).toBe(404)
        expect(response.data.message).toBe('Page not found')
        expect(response.data.name).toBe('NotFound')
      }
    })
  })
})
