import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import PropTypes from "prop-types"

const blogPosts = [
  {
    id: 1,
    title: "Computer Vision in Today's World",
    excerpt:
      "Computer Vision technology has been prevalent since the 1950s. But it was not until the boom in the field of AI and ML, this technology proved to have innumerable applications.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Yash Pachchigar",
    date: "Aug 18, 2023",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "ARE ELECTRIC CARS HERE TO STAY?",
    excerpt:
      "With the global threats of termination of oils, technology gives a majority of its attention at finding alternatives to sustain the standard of living without any sort of compensation.",
    image: "/placeholder.svg?height=200&width=300",
    author: "Siya Mulge",
    date: "Aug 13, 2023",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Netflix's Recommendation System using Machine Learning",
    excerpt:
      'How does Netflix know that you like Money Heist? And no, it\'s not the FBI spying on your "Bella Ciao" wall-poster.',
    image: "/placeholder.svg?height=200&width=300",
    author: "Aarohi Manchanda",
    date: "Aug 2, 2023",
    readTime: "6 min read",
  },
]

const BlogCard = ({ post }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {post.date} • {post.readTime}
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-ieee-blue dark:text-blue-400 hover:underline flex items-center"
          >
            Read more
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.string.isRequired,
  }).isRequired,
}

function BlogPosts() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-display">Blog Posts</h2>
          <p className="text-gray-600 dark:text-gray-400">Explore the latest insights from our community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-ieee-blue text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md"
          >
            More Blogs
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default BlogPosts

