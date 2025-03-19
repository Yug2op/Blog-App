import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
        setLoading(false);
    })

    if (loading) {
        // Show a loading indicator while fetching posts
        return (
          <div className="w-full py-16 flex justify-center items-center bg-gray-400">
            <Container>
              <div className="flex flex-col justify-center items-center space-y-4">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      
                {/* Loading Text */}
                <p className="text-xl font-semibold text-gray-700">
                  Fetching posts, please wait...
                </p>
              </div>
            </Container>
          </div>
        );
      }
      
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts