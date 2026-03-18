import React from 'react';
import { Helmet } from 'react-helmet-async';

const GlobalSEO: React.FC = () => {
    const companyName = "Loke Store";
    const siteUrl = "https://lokestore.in";
    const defaultTitle = "Shop Computer Parts & Laptops | Loke Store Salem";
    const defaultDescription = "Visit Loke Store at Salem for the best toys, kids toys, RC cars, remote control cars, and all types of toys. Call 8825403712 for deals on top tech brands.";
    const defaultImage = `${siteUrl}/logo.png`;

    // Organization Schema
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ComputerStore",
        "name": companyName,
        "image": [defaultImage],
        "description": defaultDescription,
        "url": siteUrl,
        "telephone": "8825403712",
        "email": "lokestore24@gmail.com",
        "priceRange": "₹₹",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Salem",
            "addressLocality": "Salem",
            "addressRegion": "Tamil Nadu",
            "postalCode": "636004",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "11.6663",
            "longitude": "78.1465"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:30",
                "closes": "21:30"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/iteckno7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
            "https://www.facebook.com/prithiv.raj.262802?mibextid=ZbWKwL"
        ]
    };

    return (
        <Helmet titleTemplate={`%s | ${companyName}`} defaultTitle={defaultTitle}>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <meta name="description" content={defaultDescription} />
            <meta name="keywords" content="Loke Store Salem, Toy store Salem, kids toys, RC cars, remote control cars, and all types of toys" />

            {/* Canonical basis */}
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph (Facebook/WhatsApp/LinkedIn) */}
            <meta property="og:site_name" content={companyName} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={defaultTitle} />
            <meta property="og:description" content={defaultDescription} />
            <meta property="og:image" content={defaultImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={defaultTitle} />
            <meta name="twitter:description" content={defaultDescription} />
            <meta name="twitter:image" content={defaultImage} />

            {/* JSON-LD Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default GlobalSEO;
