import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import jwt_decode from "jwt-decode"

/**
import qs from 'qs'
const { btoa, atob, location, localStorage } = window

function sleep (t = 0) {
  return new Promise(resolve => setTimeout(resolve, t))
}

class AccountMiddleware {

  baseUrl: string = (process.env.NEXT_PUBLIC_AUTH_URL as string)
  clientId: string = (process.env.NEXT_PUBLIC_AUTH_CLIENTID as string)
  isUsingSSO: boolean = false

  async checkToken () {
    // const setAppToken = (token: string) => {
    //   ctx.app.set('token', token)
    //   ctx.app.set('identity', token ? this.decode(token) : {})
    //   const headers: any = {
    //     'Content-Type': 'application/json',
    //     'Authorization': null
    //   }
    //   if (token) {
    //     headers['Authorization'] = `Bearer ${token}`
    //   }
    //   ctx.app.set('headers', headers)
    // }

    let token = this.getToken()
    // if (token) {
    //   setAppToken(token)
    // }

    const hash = location.hash
    if (hash.includes('access_token=')) {
      const authData = (qs.parse(hash.substr(1)) as any)
      const b64Encoded = Buffer.from(authData.state, 'base64').toString()
      const state = JSON.parse(b64Encoded)
      this.save(authData.access_token)
      token = this.getToken()
      location.href = '/'
      await sleep(300)
      return true
    }

    if (!token) {
      this.signin()
      await sleep(300)
      return
    }

    if(token) {
      const { exp } = this.decode(token)
      const timenow = new Date().getTime()
      if ((exp * 1000) < timenow) {
        this.invalidate()
        this.signin()
        await sleep(300)
      }
      return
    }

    return true
  }

  getToken (): string {
    let token = localStorage.APP_TOKEN
    if (token && !this.decode(token)) {
      this.invalidate()
      token = undefined
    }
    return token
  }

  signin () {
    const state = Buffer.from(JSON.stringify({
      uri: location.hash.split('#!').pop(),
    })).toString('base64')
    location.href = `${this.baseUrl}/oauth/auth?client_id=${this.clientId}&response_type=token&response_mode=fragment&state=${state}`
  }

  signout () {
    this.invalidate()
    location.href = `${this.baseUrl}/oauth/signout?client_id=${this.clientId}`
  }

  save (token: string) {
    localStorage.APP_TOKEN = token
  }

  invalidate () {
    delete localStorage.APP_TOKEN
  }

  decode (token: string): Record<string, any> {
    return jwt_decode(token)
  }
}
*/

// export default async function auth(context) {
//   const auth = new AccountMiddleware()
//   const { next } = context
//   const loggedin = await auth.checkToken()
//   return loggedin
// }

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/_next')) return

  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-email'
  ]

  if (publicRoutes.indexOf(pathname) >= 0) return

  const authorization_token = request.cookies.get('authorization_token')
  if(!authorization_token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { exp } = (jwt_decode(authorization_token) as any)
  const timenow = new Date().getTime()
  if ((exp * 1000) < timenow) {
    request.cookies.delete('authorization_token')
    request.cookies.clear()
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: '/:path*',
}
