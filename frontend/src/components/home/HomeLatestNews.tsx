import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService, Blog } from '../admin/services/blogService';
import { getImageUrl, getPlaceholderImage } from '../utils/imageUtils';
import { ArrowRight } from 'lucide-react';
import { ToyTheme } from '../../theme/designTokens';

const HomeLatestNews: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogService.getPublishedBlogs({
          limit: 5,
          sort: '-published_at',
          featured: true // Add featured filter
        });

        if (response.success) {
          setBlogs(response.data);
        }
      } catch (err: any) {
        console.error('Failed to load featured blogs:', err);
        setError('Failed to load news');

        // Fallback: Show empty section instead of error
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  // --- Helpers ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getBlogImageUrl = (blog: Blog) => {
    if (blog.image_url) {
      return getImageUrl(blog.image_url);
    }
    return getPlaceholderImage(blog.title || 'Blog');
  };

  const getCleanSlug = (blog: Blog) => {
    const slug = blog.slug || '';
    return slug.toString().replace(/\n/g, '').trim();
  };

  const getCategory = (blog: Blog) => {
    if (Array.isArray(blog.category)) return blog.category[0];
    return blog.category || 'News';
  };

  if (loading) {
    return (
      <div className={`max-w-[85rem] mx-auto px-4 py-12 ${ToyTheme.colors.background.page}`}>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-purple-200 w-48 rounded-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`h-96 bg-purple-100 ${ToyTheme.shapes.card}`}></div>
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-40 bg-purple-100 ${ToyTheme.shapes.card}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show nothing if no featured blogs
  if (blogs.length === 0) return null;

  // Split data: First item is "Featured", rest are "Grid"
  const featuredPost = blogs[0];
  const sidePosts = blogs.slice(1, 5);

  return (
    <section className={`py-12 ${ToyTheme.colors.background.page}`}>
      <div className={ToyTheme.layout.container}>

        {/* --- Header --- */}
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${ToyTheme.colors.text.heading}`}>
            <span className="text-purple-500">Fun</span> <span className="text-pink-500">Stories</span>
          </h2>
          <Link
            to="/blogs"
            className={`text-xs font-bold ${ToyTheme.colors.primary.text} hover:opacity-80 uppercase tracking-wide flex items-center transition-colors bg-white px-4 py-2 ${ToyTheme.shapes.pill} shadow-sm border border-purple-100`}
          >
            Read All Stories
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>

        {/* --- Layout Content --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT: Featured Big Post */}
          <div className="flex flex-col h-full group">
            <Link to={`/blog/${getCleanSlug(featuredPost)}`} className={`block overflow-hidden ${ToyTheme.shapes.card} relative mb-4 shadow-md`}>
              <img
                src={getBlogImageUrl(featuredPost)}
                alt={featuredPost.title}
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Floating Badge */}
              <span className={`absolute bottom-4 left-4 ${ToyTheme.colors.secondary.default} text-yellow-900 text-[10px] font-black px-3 py-1 uppercase tracking-wider ${ToyTheme.shapes.pill} shadow-sm`}>
                {getCategory(featuredPost)}
              </span>
            </Link>

            <div className="flex flex-col flex-1 px-2">
              <Link to={`/blog/${getCleanSlug(featuredPost)}`}>
                <h3 className={`text-2xl font-black ${ToyTheme.colors.text.heading} mb-3 leading-tight group-hover:text-purple-600 transition-colors`}>
                  {featuredPost.title}
                </h3>
              </Link>

              <p className={`${ToyTheme.colors.text.body} text-sm leading-relaxed mb-4 line-clamp-3 font-medium`}>
                {featuredPost.meta_tags || featuredPost.excerpt || featuredPost.html?.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
              </p>

              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white px-2 py-1 rounded-md">
                  {formatDate(featuredPost.published_at || featuredPost.created_at)}
                </span>
                <Link
                  to={`/blog/${getCleanSlug(featuredPost)}`}
                  className={`text-xs font-black ${ToyTheme.colors.text.heading} uppercase flex items-center hover:text-purple-600 transition-colors`}
                >
                  Read More <ArrowRight className="w-3 h-3 ml-1 text-purple-500" strokeWidth={3} />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Grid of Smaller Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {sidePosts.map((post) => (
              <div key={post._id} className="group flex flex-col">
                <Link to={`/blog/${getCleanSlug(post)}`} className={`block overflow-hidden ${ToyTheme.shapes.card} relative mb-3 shadow-sm hover:shadow-md transition-shadow`}>
                  <img
                    src={getBlogImageUrl(post)}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Badge Overlapping Image Bottom */}
                  <span className={`absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-purple-600 text-[10px] font-black px-2 py-0.5 uppercase tracking-wider ${ToyTheme.shapes.pill} shadow-sm`}>
                    {getCategory(post)}
                  </span>
                </Link>

                <Link to={`/blog/${getCleanSlug(post)}`} className="px-1">
                  <h4 className={`text-base font-bold ${ToyTheme.colors.text.heading} leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors`}>
                    {post.title}
                  </h4>
                </Link>

                {/* Optional: Add date for small posts */}
                <p className="text-xs text-gray-400 mt-1 font-semibold px-1">
                  {formatDate(post.published_at || post.created_at)}
                </p>
              </div>
            ))}

            {/* Show empty slots if fewer than 5 featured blogs */}
            {sidePosts.length < 4 && Array.from({ length: 4 - sidePosts.length }).map((_, index) => (
              <div key={`empty-${index}`} className="opacity-0">
                {/* Empty placeholder to maintain grid layout */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLatestNews;