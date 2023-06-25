import { NextResponse } from 'next/server'

export function middleware(req) {
    let cookie = req.cookies.get('user')
    // console.log(cookie)
    const url = req.nextUrl.clone()
    // console.log(url.pathname)


    if (!cookie && url.pathname === '/') {
        return NextResponse.rewrite(`${url.origin}/login`)
    }
    return NextResponse.next()
}
