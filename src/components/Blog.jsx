import React, { useState, useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState('All');

  // Replace with your Medium username
  const MEDIUM_USERNAME = '@narasimhakamath'; // Change this to your Medium username

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);
        // Using RSS2JSON API to convert Medium RSS feed to JSON
        const RSS_URL = `https://medium.com/feed/${MEDIUM_USERNAME}`;
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();
        
        if (data.status !== 'ok') {
          throw new Error('Error fetching Medium posts');
        }

        // Transform Medium posts to match our format
        const transformedPosts = data.items.map((item, index) => {
          // Extract tags from categories
          const tags = item.categories || [];
          
          // Calculate read time (rough estimate: 200 words per minute)
          const wordCount = item.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
          const readTime = Math.ceil(wordCount / 200);

          // Clean excerpt from HTML content
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = item.description;
          const excerpt = tempDiv.textContent.slice(0, 150) + '...';

          return {
            id: index + 1,
            title: item.title,
            date: new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            excerpt: excerpt,
            tags: tags.slice(0, 3), // Limit to 3 tags
            readTime: `${readTime} min read`,
            link: item.link,
            thumbnail: item.thumbnail
          };
        });

        setBlogPosts(transformedPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching Medium posts:', err);
        setError('Unable to load blog posts. Please try again later.');
        // Fallback to empty array
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  // Get all unique tags
  const allTags = ['All', ...new Set(blogPosts.flatMap(post => post.tags))];

  // Filter posts by selected tag
  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(selectedTag));

  return (
    <section id="blog" className="blog">
      <div className="blog-container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          {loading ? 'Loading posts...' : error ? error : 'Thoughts that didn\'t stay in my head'}
        </p>
        
        {!loading && !error && blogPosts.length > 0 && (
          <>
            {/* <div className="tag-filter">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div> */}

            <div className="blog-grid">
              {filteredPosts.map(post => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-header">
                    <span className="blog-date">{post.date}</span>
                    <span className="read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="blog-tags">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Read more →
                  </a>
                </article>
              ))}
            </div>
          </>
        )}

        {!loading && !error && blogPosts.length === 0 && (
          <div className="no-posts">
            <p>No blog posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
