/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        // remotePatterns: [
        //     {
        //         protocol: 'http',
        //         hostname: 'localhost',
        //         port: '4000',
        //         pathname: '/uploads/**',
        //     },
        // ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'social-media-backend-7uko.onrender.com',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
}

module.exports = nextConfig
