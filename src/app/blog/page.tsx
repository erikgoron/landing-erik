import Link from 'next/link';

const blogPosts = [
  { id: 1, title: "The Future of AI in Healthcare", category: "AI" },
  { id: 2, title: "Exploring the Latest Advancements in Speech Recognition", category: "AI" },
  { id: 3, title: "My Journey Learning the Guitar", category: "Music" },
  { id: 4, title: "Top 5 Surfing Spots in California", category: "WaterSports" },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500">{post.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
