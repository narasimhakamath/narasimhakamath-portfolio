import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Building Banking-As-A-Service: Lessons Learned',
      date: 'Coming January 2026',
      excerpt: 'Insights from building a Virtual Account Management system for banks and fintechs. Discussing architecture decisions, scalability challenges, and best practices.',
      tags: ['Architecture', 'Backend', 'FinTech'],
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Managing Technical Teams: From IC to Architect',
      date: 'Coming February 2026',
      excerpt: 'My journey from individual contributor to Technical Architect, and what I learned about leadership, mentorship, and building high-performing teams.',
      tags: ['Leadership', 'Career', 'Tech Management'],
      readTime: '6 min read'
    },
    {
      id: 3,
      title: 'Backend vs Full-Stack: Making the Right Career Choice',
      date: 'Coming February 2026',
      excerpt: 'Exploring the differences between specializing in backend development versus being a full-stack engineer, and how to choose your path.',
      tags: ['Career', 'Backend', 'Full Stack'],
      readTime: '5 min read'
    }
  ];

  const [selectedTag, setSelectedTag] = useState('All');

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
        <p className="section-subtitle">Coming soon in 2026 - Insights on architecture, fintech, and engineering leadership</p>
        
        <div className="tag-filter">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-header">
                <span className="blog-date">{post.date}</span>
                <span className="read-time">{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <button className="read-more">Read More →</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
