import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.realt.by'
			},
			{
				protocol: 'https',
				hostname: 'static.realt.by'
			},
			{
				protocol: 'https',
				hostname: 'i.redd.it'
			}
		]
	}
};

export default nextConfig;
