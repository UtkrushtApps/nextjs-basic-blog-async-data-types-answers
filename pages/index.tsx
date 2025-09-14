// pages/index.tsx
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Post } from '../types/Post';

const fetchPosts = async (): Promise<Post[]> => {
  // Simulate fetching posts from an API
  // In real-world, this would be a fetch('/api/posts') call
  // Add artificial delay
  await new Promise((res) => setTimeout(res, 1000));
  return [
    {
      id: 1,
      title: 'Hello Next.js',
      content: 'This is a sample blog post.',
    },
    {
      id: 2,
      title: 'Async and TypeScript',
      content: 'Always type your async data in Next.js!'
    },
  ];
};

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPosts();
        if (!cancelled) {
          setPosts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load posts.');
          setPosts(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPosts();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <span role="status" aria-live="polite">Loading blog posts...</span>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        Error: {error}
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Blog Posts</h1>
      {posts && posts.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts found.</p>
      )}
    </main>
  );
};

export default Home;
