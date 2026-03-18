import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_URL = 'https://lokestore.in';
const API_URL = 'https://api.lokestore.in/api/v1';

async function generateSitemap() {
    const urls = [];

    // 1. Static Pages
    const staticPages = [
        '',
        '/products',
        '/blogs',
        '/about',
        '/contact',
        '/support',
        '/prebuilt-pcs',
        '/custom-pcs'
    ];

    staticPages.forEach((page) => {
        urls.push({
            loc: `${SITE_URL}${page}`,
            changefreq: 'weekly',
            priority: page === '' ? 1.0 : 0.8
        });
    });

    // 2. Fetch Products
    try {
        console.log('Fetching products...');
        const productsRes = await axios.get(`${API_URL}/products?limit=1000`);
        const products = productsRes.data?.data?.products || productsRes.data?.products || [];
        if (Array.isArray(products)) {
            products.forEach((p) => {
                if (p.slug) {
                    urls.push({
                        loc: `${SITE_URL}/product/${p.slug}`,
                        changefreq: 'weekly',
                        priority: 0.9,
                        lastmod: p.updatedAt || p.createdAt || new Date().toISOString()
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Failed to fetch products for sitemap:', error.message);
    }

    // 3. Fetch Blogs
    try {
        console.log('Fetching blogs...');
        const blogsRes = await axios.get(`${API_URL}/blogs`);
        const blogs = blogsRes.data?.data || blogsRes.data || [];
        if (Array.isArray(blogs)) {
            blogs.forEach((b) => {
                const slug = b.slug || b.Slug;
                if (slug) {
                    urls.push({
                        loc: `${SITE_URL}/blog/${slug}`,
                        changefreq: 'monthly',
                        priority: 0.7,
                        lastmod: b.updated_at || b.created_at || new Date().toISOString()
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Failed to fetch blogs for sitemap:', error.message);
    }

    // 4. Fetch Categories
    try {
        console.log('Fetching categories...');
        const catsRes = await axios.get(`${API_URL}/categories`);
        const categories = catsRes.data?.data?.categories || catsRes.data?.data || catsRes.data?.categories || catsRes.data || [];
        if (Array.isArray(categories)) {
            categories.forEach((c) => {
                if (c.slug) {
                    urls.push({
                        loc: `${SITE_URL}/products/category/${c.slug}`,
                        changefreq: 'weekly',
                        priority: 0.8,
                        lastmod: c.updatedAt || c.createdAt || new Date().toISOString()
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Failed to fetch categories for sitemap:', error.message);
    }

    // 5. Fetch Brands
    try {
        console.log('Fetching brands...');
        const brandsRes = await axios.get(`${API_URL}/brands`);
        const brands = brandsRes.data?.data?.brands || brandsRes.data?.data || brandsRes.data?.brands || brandsRes.data || [];
        if (Array.isArray(brands)) {
            brands.forEach((b) => {
                if (b.slug) {
                    urls.push({
                        loc: `${SITE_URL}/products/brand/${b.slug}`,
                        changefreq: 'weekly',
                        priority: 0.8,
                        lastmod: b.updatedAt || b.createdAt || new Date().toISOString()
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Failed to fetch brands for sitemap:', error.message);
    }

    // 6. Fetch Prebuilt PCs
    try {
        console.log('Fetching prebuilt PCs...');
        const prebuiltRes = await axios.get(`${API_URL}/prebuilt-pcs`);
        const prebuilts = prebuiltRes.data?.data?.prebuiltPcs || prebuiltRes.data?.data || prebuiltRes.data?.prebuiltPcs || prebuiltRes.data || [];
        if (Array.isArray(prebuilts)) {
            prebuilts.forEach((p) => {
                if (p.slug) {
                    urls.push({
                        loc: `${SITE_URL}/prebuilt-pcs/${p.slug}`,
                        changefreq: 'weekly',
                        priority: 0.8,
                        lastmod: p.updatedAt || p.createdAt || new Date().toISOString()
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Failed to fetch prebuilt PCs for sitemap:', error.message);
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.lastmod ? `\n    <lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''}
  </url>`
            )
            .join('\n')}
</urlset>`;

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
