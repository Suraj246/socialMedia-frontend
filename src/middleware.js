import { NextResponse } from 'next/server'

export function middleware(req) {
    let cookie = req.cookies.get('user')
    // console.log(cookie)
    const url = req.nextUrl.clone()
    console.log(url.pathname)
    console.log(url.origin)


    if (!cookie && url.pathname === "/" || 'https://social-media-frontend-tan.vercel.app/') {
        return NextResponse.rewrite(`${url.origin}/login` || `https://social-media-frontend-ih0dgi7xv-suraj246.vercel.app/login`)
    }
    return NextResponse.next()
}
