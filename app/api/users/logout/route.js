import { NextResponse } from 'next/server';

export async function GET() {
    const response = NextResponse.json({ success: true }, {status : 200});

    response.cookies.set('token', '', {
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: 'strict', // Prevent CSRF
    maxAge: 0, // Expire immediately
    path: '/', // Ensure cookie is cleared across the entire site
    });

    return response;
}
